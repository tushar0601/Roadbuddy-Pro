/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader2, CheckCircle2, AlertCircle, CarFront } from "lucide-react";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { useCreatePing } from "@/hooks/use-create-ping";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type PublicPingScreenProps = {
  publicCode: string;
  sticker: {
    status: string;
    is_active: boolean;
  };
};

type PingFormValues = {
  reason: string;
  note: string;
};

const REASON_OPTIONS = [
  "Lights are on",
  "Blocking the way",
  "Vehicle damage",
  "Other",
];

export function PublicPingScreen({
  publicCode,
  sticker,
}: PublicPingScreenProps) {
  const {
    createPing,
    createPingPending,
    createPingSuccess,
    createPingResponse,
    resetCreatePing,
  } = useCreatePing(publicCode);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PingFormValues>({
    defaultValues: {
      reason: "",
      note: "",
    },
  });

  const selectedReason = useWatch({
    control,
    name: "reason",
  });

  const trimmedPublicCode = publicCode.trim();

  const onSubmit = async (values: PingFormValues) => {
    try {
      const payload = {
        reason: values.reason?.trim() || null,
        note: values.note?.trim() || null,
      };

      await createPing(payload);

      toast.success("Ping sent successfully");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "Unable to send ping right now";
      toast.error(message);
    }
  };

  const handleSendAnother = () => {
    resetCreatePing();
    reset({
      reason: "",
      note: "",
    });
  };

  if (!sticker.is_active) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <AlertCircle className="h-8 w-8" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-slate-50">
              QR Code Not Active
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              This sticker is not active or no longer valid.
            </p>

            <p className="mt-4 text-xs text-slate-500">
              Status: {sticker.status}
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }
  if (createPingSuccess && createPingResponse) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
              Ping sent
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              The vehicle owner has been notified. Thanks for taking the time to
              help.
            </p>

            <Button
              type="button"
              className="mt-8 h-11 w-full rounded-xl"
              onClick={handleSendAnother}
            >
              Send another ping
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-md px-4 py-6 sm:px-6">
        <div className="mb-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-4 shadow-2xl">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <CarFront className="h-5 w-5" />
          </div>

          <p className="mb-2 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-300">
            RoadBuddy alert
          </p>

          <h1 className="text-xl font-bold tracking-tight">
            Alert vehicle owner
          </h1>

          <p className="mt-2 text-sm text-slate-400">Pick a reason and send.</p>

          <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Sticker code
            </p>
            <p className="mt-1 text-sm font-medium text-slate-200">
              {trimmedPublicCode}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <Label className="text-sm font-medium text-slate-200">Reason</Label>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {REASON_OPTIONS.map((option) => {
                const isSelected = selectedReason === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setValue("reason", option, { shouldValidate: true })
                    }
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm transition",
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 text-blue-200"
                        : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <input
              type="hidden"
              {...register("reason", {
                required: "Please select a reason",
                maxLength: {
                  value: 100,
                  message: "Reason must be at most 100 characters",
                },
              })}
            />

            {errors.reason && (
              <p className="mt-3 text-sm text-red-400">
                {errors.reason.message}
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="space-y-2">
              <Label
                htmlFor="note"
                className="text-sm font-medium text-slate-200"
              >
                Optional note
              </Label>

              <Textarea
                id="note"
                rows={5}
                placeholder="Add a short message for the vehicle owner..."
                className="rounded-2xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500"
                {...register("note", {
                  maxLength: {
                    value: 1000,
                    message: "Note must be at most 1000 characters",
                  },
                })}
              />

              {errors.note && (
                <p className="text-sm text-red-400">{errors.note.message}</p>
              )}
            </div>
          </section>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Use this only for genuine vehicle-related alerts. Do not send
                spam or abusive messages.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl text-base font-medium"
            disabled={createPingPending}
          >
            {createPingPending ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending ping...
              </span>
            ) : (
              "Send alert"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
