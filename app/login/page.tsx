import Header from "@/components/header";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-10">
        <Header />
        <section className="rounded-3xl border border-border/60 bg-white/80 p-8 shadow-lg backdrop-blur">
          <div className="space-y-2 pb-4">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              Login
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin sifatida tizimga kiring
            </h1>
            <p className="text-sm text-slate-600">
              Faqat tasdiqlangan foydalanuvchilar dashboard va to‘lov jarayoniga
              kira oladi.
            </p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}

