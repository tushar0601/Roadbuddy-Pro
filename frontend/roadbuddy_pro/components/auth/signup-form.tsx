/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  CalendarDays,
  Loader2,
} from "lucide-react";

import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

const signupSchema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      date_of_birth: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      setLoading(true);

      await api.post("/user/signup", values);
      toast.success("Account created successfully");

      router.push("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "Unable to create account";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
          <UserPlus className="h-5 w-5" />
        </div>

        <div>
          <CardTitle className="text-2xl font-bold text-slate-100">
            Create your account
          </CardTitle>
          <p className="mt-1 text-sm text-slate-400">
            Join RoadBuddy and start managing your vehicle alerts.
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Name
            </Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="name"
                placeholder="Enter your full name"
                className="h-11 rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-500"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11 rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-500"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_birth" className="text-slate-200">
              Date of birth
            </Label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                id="date_of_birth"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="flex h-11 w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3 text-slate-100 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]"
                {...register("date_of_birth")}
                onClick={(e) => {
                  const input = e.currentTarget as HTMLInputElement & {
                    showPicker?: () => void;
                  };
                  input.showPicker?.();
                }}
              />
            </div>

            {errors.date_of_birth && (
              <p className="text-sm text-red-400">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="h-11 rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-500"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl text-sm font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </Button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-400 transition hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
