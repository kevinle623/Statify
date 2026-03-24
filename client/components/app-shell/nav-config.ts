import { LayoutDashboard, User, Music, Clock } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/artists", label: "Artists", icon: User },
  { href: "/tracks", label: "Tracks", icon: Music },
  { href: "/history", label: "History", icon: Clock },
] as const;

export function getBreadcrumb(pathname: string): string {
  if (pathname.startsWith("/dashboard")) return "Status: Synchronized";
  if (pathname.startsWith("/artists")) return "Archive / Top Artists";
  if (pathname.startsWith("/tracks")) return "Archive / Top Tracks";
  if (pathname.startsWith("/history")) return "Archive / History";
  return "Archive";
}
