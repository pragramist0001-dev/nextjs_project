import Header from "@/components/header";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <Header />
        <section className="rounded-3xl border border-border/70 bg-white/80 p-10 text-center shadow-lg backdrop-blur">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Success
          </p>
          <h1 className="pt-4 text-3xl font-bold text-slate-900">
            Tabriklaymiz! Sizning buyurtmangiz muvaffaqiyatli amalga oshirildi.
            Tez orada mahsulotlaringiz yetkazib beriladi!
          </h1>
        </section>
      </div>
    </main>
  );
}

