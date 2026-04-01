"use client";

import { useState } from "react";
import { AppNavbar } from "@/components/common/app-navbar";
import { AddVehicleDialog } from "@/components/dashboard/add-vehicle-dialog";
import { NotificationsList } from "@/components/dashboard/notifications-list";
import { VehiclesList } from "@/components/dashboard/vehicles-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AppNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                Smart vehicle safety
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-100">
                Your RoadBuddy dashboard
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Register vehicles, review recent pings, and keep track of
                important activity from one place.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <NotificationsList />
          <VehiclesList />
        </section>
      </main>

      <AddVehicleDialog open={open} setOpen={setOpen} />
    </div>
  );
}
