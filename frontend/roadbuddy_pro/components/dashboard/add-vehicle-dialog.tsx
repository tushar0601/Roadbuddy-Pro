/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useVehicles } from "@/hooks/use-vehicles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VehicleFormValues = {
  sticker_code: string;
  plate_no: string;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function AddVehicleDialog({ open, setOpen }: Props) {
  const { registerVehicle, registerVehiclePending } = useVehicles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    defaultValues: {
      sticker_code: "",
      plate_no: "",
    },
  });

  const onSubmit = async (values: VehicleFormValues) => {
    try {
      await registerVehicle(values);
      toast.success("Vehicle registered successfully");
      reset();
      setOpen(false);
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "Unable to register vehicle";
      toast.error(message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogContent className="sm:max-w-lg rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            Register Vehicle
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            Enter the sticker code and plate number to connect this vehicle to
            your account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="sticker_code" className="text-slate-200">
              Sticker code
            </Label>
            <Input
              id="sticker_code"
              placeholder="e.g. RB-8X2K9"
              className="h-11 rounded-xl border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
              {...register("sticker_code", {
                required: "Sticker code is required",
              })}
            />
            {errors.sticker_code && (
              <p className="text-sm text-red-400">
                {errors.sticker_code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="plate_no" className="text-slate-200">
              Plate number
            </Label>
            <Input
              id="plate_no"
              placeholder="e.g. MH12AB1234"
              className="h-11 rounded-xl border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
              {...register("plate_no", {
                required: "Plate number is required",
              })}
            />
            {errors.plate_no && (
              <p className="text-sm text-red-400">
                {errors.plate_no.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="min-w-[160px] rounded-xl"
              disabled={registerVehiclePending}
            >
              {registerVehiclePending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Registering...
                </span>
              ) : (
                "Register Vehicle"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}