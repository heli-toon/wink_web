export const formatPrice = (amount: number, currency = "GHS") => {
  try {
    const locale = currency === "GHS" ? "en-GH" : currency === "NGN" ? "en-NG" : "en-US";
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
};

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
};

export const initials = (name?: string | null) =>
  (name || "U").split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");

// Haversine distance (km)
export const distanceKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371;
  const toRad = (n: number) => (n * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

export const TASK_CATEGORIES = [
  { id: "errand", label: "Errands" },
  { id: "delivery", label: "Delivery" },
  { id: "cleaning", label: "Cleaning" },
  { id: "handyman", label: "Handyman" },
  { id: "tutor", label: "Tutoring" },
  { id: "design", label: "Design" },
  { id: "writing", label: "Writing" },
  { id: "dev", label: "Development" },
  { id: "marketing", label: "Marketing" },
  { id: "other", label: "Other" },
] as const;
