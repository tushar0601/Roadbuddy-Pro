"use client";

import { useRouter } from "next/navigation";
import { LogOut, Shield, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/lib/auth";
import { EnableNotificationsButton } from "../public/notification-button";
export function AppNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400 shadow-inner">
            <CarFront className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
              RoadBuddy
            </h1>
            <EnableNotificationsButton/>
            <p className="flex items-center gap-1 text-sm text-slate-400">
              <Shield className="h-3.5 w-3.5" />
              Vehicle notifications dashboard
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
