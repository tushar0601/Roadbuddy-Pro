"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, QrCode } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Stickers",
      href: "/admin/stickers",
      icon: QrCode,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="px-6 py-6">
          <h1 className="text-xl font-bold">RoadBuddy</h1>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition ${
                  active
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname === "/admin/stickers"
                ? "Sticker Generator"
                : "Admin"}
            </h2>

            <div className="text-sm text-slate-400">
              Admin
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}