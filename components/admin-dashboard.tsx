"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase-client";

type FormState = {
  name: string;
  price: string;
  image_url: string;
  description: string;
};

const initialState: FormState = {
  name: "",
  price: "",
  image_url: "",
  description: "",
};

export default function AdminDashboard() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setChecking(false);
      }
    });
  }, [router, supabase]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus(null);
    const priceValue = Number(form.price);
    if (Number.isNaN(priceValue) || priceValue <= 0) {
      setError("Narx musbat son bo‘lishi kerak.");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: priceValue }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Saqlashda xatolik yuz berdi.");
    } else {
      setStatus("Mahsulot muvaffaqiyatli qo‘shildi.");
      setForm(initialState);
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <section className="rounded-3xl border border-border/60 bg-white/80 p-8 text-center shadow-lg">
        Foydalanuvchi holati tekshirilmoqda...
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-border/70 bg-white/80 p-8 shadow-lg backdrop-blur">
      <div className="space-y-2 pb-4">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
          Admin dashboard
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Yangi mahsulot qo‘shish
        </h1>
        <p className="text-sm text-slate-600">
          Shaklni to‘ldiring va Supabase maʼlumotlar bazasiga yangi yozuv
          qo‘shing.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Mahsulot nomi
          </label>
          <Input
            required
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Masalan, Bezshum klaviatura"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Mahsulot narxi (USD)
          </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={(event) => handleChange("price", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Mahsulot rasmi URL
          </label>
          <Input
            required
            value={form.image_url}
            onChange={(event) => handleChange("image_url", event.target.value)}
            placeholder="https://images.example.com/product.jpg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Mahsulot tavsifi
          </label>
          <Textarea
            required
            value={form.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            placeholder="Mahsulot haqida batafsil maʼlumot"
          />
        </div>
        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {status && (
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600">
            {status}
          </p>
        )}
        <Button
          type="submit"
          className="w-full rounded-xl py-2 text-base font-semibold"
          disabled={loading}
        >
          {loading ? "Saqlanmoqda..." : "Mahsulotni saqlash"}
        </Button>
      </form>
    </section>
  );
}

