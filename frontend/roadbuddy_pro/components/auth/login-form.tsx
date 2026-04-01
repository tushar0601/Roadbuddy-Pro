/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { SigninResponse } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);

      const response = await api.post<SigninResponse>("/user/signin", values);

      setToken(response.data.access_token);
      toast.success("Signed in successfully");

      router.push("/dashboard");
    } catch (error: any) {
      const message = error?.response?.data?.detail || "Unable to sign in";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
          <LogIn className="h-5 w-5" />
        </div>

        <div>
          <CardTitle className="text-2xl font-bold text-slate-100">
            Welcome back
          </CardTitle>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to manage your vehicles and notifications.
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <Label htmlFor="password" className="text-slate-200">
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
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
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-400 transition hover:text-blue-300"
            >
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}