"use client";

import { CarFront, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { useVehicles } from "@/hooks/use-vehicles";

export function VehiclesList() {
  const { vehicles, isLoading } = useVehicles();

  return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-100">
            <CarFront className="h-5 w-5 text-blue-400" />
            Your Vehicles
          </CardTitle>
          <p className="mt-1 text-sm text-slate-400">
            Manage the vehicles linked to your account.
          </p>
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
          {vehicles.length} total
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <LoadingState text="Loading vehicles..." />
        ) : vehicles.length === 0 ? (
          <EmptyState
            title="No vehicles registered"
            description="Register your first vehicle using a valid sticker code."
          />
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-md transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
                      <CarFront className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-base font-semibold text-slate-100">
                        {vehicle.nickname || `Vehicle ${index + 1}`}
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        Plate ending:{" "}
                        <span className="font-medium text-slate-200">
                          {vehicle.plate_last_4 || "N/A"}
                        </span>
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                          Vehicle ID linked
                        </div>

                        <div
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            vehicle.is_active
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                              : "border border-slate-700 bg-slate-800 text-slate-400"
                          }`}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {vehicle.is_active ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
