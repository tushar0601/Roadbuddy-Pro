"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, isAuthenticated } from "@/lib/auth";
import { LandingHero } from "@/components/common/landing-hero";

function subscribeAuthStore() {
  return () => {};
}

export function AuthAwareHome() {
  const router = useRouter();
  const authenticated = useSyncExternalStore(
    subscribeAuthStore,
    isAuthenticated,
    () => false,
  );
  const admin = useSyncExternalStore(subscribeAuthStore, isAdmin, () => false);

  useEffect(() => {
    if (authenticated) {
      router.replace(admin ? "/admin" : "/dashboard");
    }
  }, [authenticated, admin, router]);

  if (authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">
        Opening RoadBuddy...
      </div>
    );
  }

  return <LandingHero />;
}
