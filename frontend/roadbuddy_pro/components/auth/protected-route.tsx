"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isClient = useIsClient();

  const authenticated = isClient ? isAuthenticated() : false;

  useEffect(() => {
    if (isClient && !authenticated) {
      router.replace("/login");
    }
  }, [isClient, authenticated, router]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
