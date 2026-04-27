
-- =========================================================
-- ENUMS
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.task_type AS ENUM ('physical', 'digital');
CREATE TYPE public.task_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.request_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE public.txn_status AS ENUM ('pending', 'success', 'failed', 'refunded');

-- =========================================================
-- updated_at trigger function
-- =========================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  location_label TEXT,
  average_rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =========================================================
-- USER ROLES (separate table — never on profiles)
-- =========================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "user_roles_select_self_or_admin" ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- Auto create profile + 'user' role on signup
-- =========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 6)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- TASKS
-- =========================================================
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  accepted_request_id UUID,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  type task_type NOT NULL,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  location_label TEXT,
  radius_km NUMERIC(6,2) DEFAULT 5,
  status task_status NOT NULL DEFAULT 'open',
  attachments JSONB DEFAULT '[]'::jsonb,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tasks_updated BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX tasks_status_idx ON public.tasks(status);
CREATE INDEX tasks_category_idx ON public.tasks(category);
CREATE INDEX tasks_type_idx ON public.tasks(type);
CREATE INDEX tasks_posted_by_idx ON public.tasks(posted_by);

CREATE POLICY "tasks_select_visible" ON public.tasks FOR SELECT USING (
  status = 'open'
  OR posted_by = auth.uid()
  OR accepted_by = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "tasks_insert_own" ON public.tasks FOR INSERT
  WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "tasks_update_own_or_admin" ON public.tasks FOR UPDATE
  USING (auth.uid() = posted_by OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "tasks_delete_own_or_admin" ON public.tasks FOR DELETE
  USING (auth.uid() = posted_by OR public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- TASK REQUESTS
-- =========================================================
CREATE TABLE public.task_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  proposed_price NUMERIC(12,2),
  status request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (task_id, requester_id)
);
ALTER TABLE public.task_requests ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER task_requests_updated BEFORE UPDATE ON public.task_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX task_requests_task_idx ON public.task_requests(task_id);

-- security definer to check task ownership without recursion
CREATE OR REPLACE FUNCTION public.is_task_poster(_task_id uuid, _user_id uuid)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.tasks WHERE id = _task_id AND posted_by = _user_id)
$$;

CREATE POLICY "task_requests_select" ON public.task_requests FOR SELECT
  USING (
    requester_id = auth.uid()
    OR public.is_task_poster(task_id, auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "task_requests_insert" ON public.task_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id AND NOT public.is_task_poster(task_id, auth.uid()));
CREATE POLICY "task_requests_update" ON public.task_requests FOR UPDATE
  USING (
    requester_id = auth.uid()
    OR public.is_task_poster(task_id, auth.uid())
  );

-- =========================================================
-- CONVERSATIONS + MESSAGES
-- =========================================================
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  poster_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (task_id, poster_id, worker_id)
);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE INDEX conversations_poster_idx ON public.conversations(poster_id);
CREATE INDEX conversations_worker_idx ON public.conversations(worker_id);

CREATE POLICY "conversations_select_participant" ON public.conversations FOR SELECT
  USING (poster_id = auth.uid() OR worker_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "conversations_insert_participant" ON public.conversations FOR INSERT
  WITH CHECK (poster_id = auth.uid() OR worker_id = auth.uid());

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  attachment_url TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX messages_conv_idx ON public.messages(conversation_id, created_at);

CREATE OR REPLACE FUNCTION public.is_conversation_participant(_conv_id uuid, _user_id uuid)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.conversations
    WHERE id = _conv_id AND (poster_id = _user_id OR worker_id = _user_id)
  )
$$;

CREATE POLICY "messages_select_participant" ON public.messages FOR SELECT
  USING (public.is_conversation_participant(conversation_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "messages_insert_participant" ON public.messages FOR INSERT
  WITH CHECK (sender_id = auth.uid() AND public.is_conversation_participant(conversation_id, auth.uid()));
CREATE POLICY "messages_update_own" ON public.messages FOR UPDATE
  USING (sender_id = auth.uid());

-- bump conversation last_message_at
CREATE OR REPLACE FUNCTION public.bump_conversation()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.conversations SET last_message_at = NEW.created_at WHERE id = NEW.conversation_id;
  RETURN NEW;
END; $$;
CREATE TRIGGER messages_bump_conv AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.bump_conversation();

-- =========================================================
-- REVIEWS
-- =========================================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (task_id, reviewer_id, reviewee_id)
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE INDEX reviews_reviewee_idx ON public.reviews(reviewee_id);

CREATE OR REPLACE FUNCTION public.can_review(_task_id uuid, _reviewer uuid, _reviewee uuid)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tasks
    WHERE id = _task_id
      AND status = 'completed'
      AND ((posted_by = _reviewer AND accepted_by = _reviewee)
        OR (accepted_by = _reviewer AND posted_by = _reviewee))
  )
$$;

CREATE POLICY "reviews_select_all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_eligible" ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id AND public.can_review(task_id, reviewer_id, reviewee_id));

-- recompute reviewee average
CREATE OR REPLACE FUNCTION public.refresh_profile_rating()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _id uuid; BEGIN
  _id := COALESCE(NEW.reviewee_id, OLD.reviewee_id);
  UPDATE public.profiles p
    SET average_rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM public.reviews WHERE reviewee_id = _id), 0),
        review_count   = (SELECT COUNT(*) FROM public.reviews WHERE reviewee_id = _id)
    WHERE p.id = _id;
  RETURN NULL;
END; $$;
CREATE TRIGGER reviews_refresh_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.refresh_profile_rating();

-- =========================================================
-- BLOG
-- =========================================================
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER blog_updated BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "blog_select_published_or_admin" ON public.blog_posts FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "blog_admin_all" ON public.blog_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- TRANSACTIONS
-- =========================================================
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  payer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  paystack_reference TEXT UNIQUE,
  status txn_status NOT NULL DEFAULT 'pending',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER transactions_updated BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "transactions_select_party_or_admin" ON public.transactions FOR SELECT
  USING (payer_id = auth.uid() OR payee_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "transactions_insert_self" ON public.transactions FOR INSERT
  WITH CHECK (payer_id = auth.uid());

-- =========================================================
-- NOTIFICATIONS
-- =========================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX notifications_user_idx ON public.notifications(user_id, read);

CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- =========================================================
-- REALTIME
-- =========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.task_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
