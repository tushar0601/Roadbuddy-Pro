"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, isAdmin } from "@/lib/auth";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isClient = useIsClient();

  const authenticated = isClient ? isAuthenticated() : false;
  const admin = isClient ? isAdmin() : false;

  useEffect(() => {
    if (!isClient) return;

    if (!authenticated) {
      router.replace("/login");
    } else if (!admin) {
      router.replace("/dashboard");
    }
  }, [isClient, authenticated, admin, router]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Checking admin access...
        </p>
      </div>
    );
  }

  if (!authenticated || !admin) {
    return null;
  }

  return <>{children}</>;
}