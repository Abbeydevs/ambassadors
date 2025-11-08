"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Shapes,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Talents", href: "/dashboard/talents", icon: Users },
  { name: "Categories", href: "/dashboard/categories", icon: Shapes },
  { name: "Blog Posts", href: "/dashboard/blog", icon: FileText },
  {
    name: "Blog Categories",
    href: "/dashboard/blog-categories",
    icon: FolderOpen,
  },
  { name: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
];

export function AdminSidebarNav({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => {
        const isActive =
          link.href === "/dashboard"
            ? pathname === link.href
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800",
              isActive && "bg-slate-800 text-white font-semibold"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
