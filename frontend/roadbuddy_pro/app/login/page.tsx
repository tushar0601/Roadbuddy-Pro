import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%)]" />
      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
