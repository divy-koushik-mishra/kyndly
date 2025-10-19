"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  AppWindow,
  BarChart3,
  Settings,
  Code,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reviews",
    href: "/dashboard/reviews",
    icon: MessageSquare,
  },
  {
    title: "Apps",
    href: "/dashboard/apps",
    icon: AppWindow,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Integration",
    href: "/dashboard/integration",
    icon: Code,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
            <p className="text-xs text-slate-400">
              Unlock unlimited reviews and advanced analytics
            </p>
          </div>
          <button className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/50">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}

