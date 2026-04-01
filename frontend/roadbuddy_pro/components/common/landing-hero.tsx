import Link from "next/link";
import { ArrowRight, Shield, QrCode, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InstallPwaButton } from "../install/install-button";
export function LandingHero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <Card className="w-full max-w-5xl rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur">
          <CardContent className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex w-fit items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                Smart vehicle safety
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl md:text-6xl">
                  RoadBuddy
                  <InstallPwaButton/>
                </h1>

                <p className="max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                  A QR-based vehicle notification platform that helps people
                  quickly and safely alert vehicle owners without exposing
                  personal contact details.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-12 rounded-xl px-6 text-sm font-semibold"
                  >
                    Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <QrCode className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                  QR-based access
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Anyone can scan a sticker and notify the owner in seconds.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                  <BellRing className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                  Instant notifications
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Vehicle owners receive timely alerts directly in their
                  dashboard.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                  Safer communication
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Reach the owner without sharing sensitive contact information
                  publicly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}