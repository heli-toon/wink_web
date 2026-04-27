import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loader2 } from "lucide-react";

const Landing      = lazy(() => import("./pages/Landing"));
const SignIn       = lazy(() => import("./pages/auth/SignIn"));
const SignUp       = lazy(() => import("./pages/auth/SignUp"));
const Browse       = lazy(() => import("./pages/tasks/Browse"));
const NewTask      = lazy(() => import("./pages/tasks/NewTask"));
const TaskDetail   = lazy(() => import("./pages/tasks/TaskDetail"));
const Dashboard    = lazy(() => import("./pages/Dashboard"));
const Messages     = lazy(() => import("./pages/chat/Messages"));
const Profile      = lazy(() => import("./pages/profile/Profile"));
const BlogList     = lazy(() => import("./pages/blog/BlogList"));
const BlogPost     = lazy(() => import("./pages/blog/BlogPost"));
const Admin        = lazy(() => import("./pages/admin/Admin"));
const NotFound     = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
              {/* Public */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* App shell — protected */}
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Browse />} />
                <Route path="/tasks/new" element={<NewTask />} />
                <Route path="/tasks/:id" element={<TaskDetail />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:conversationId" element={<Messages />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/u/:userId" element={<Profile />} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
              </Route>

              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
