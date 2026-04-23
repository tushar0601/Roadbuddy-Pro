"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Stickers", href: "/admin/stickers", icon: QrCode },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">
                RoadBuddy Admin
              </h1>
              <p className="text-xs text-slate-400">
                Manage stickers and QR access
              </p>
            </div>

            <div className="text-sm text-slate-400">Admin</div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                    active
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                      : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
        {children}
      </main>
    </div>
  );
}