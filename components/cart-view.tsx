"use client";

import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase-client";

export default function CartView() {
  const { items, total, removeItem, clearCart } = useCart();
  const router = useRouter();
  const supabase = getSupabaseClient();
  const isEmpty = items.length === 0;

  const handleCheckout = async () => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/login");
      return;
    }
    clearCart();
    router.push("/success");
  };

  return (
    <section className="grid gap-8 rounded-3xl border border-border/70 bg-white/80 p-8 shadow-lg backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
          Savatcha
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Buyurtmangizni yakunlang
        </h1>
      </div>
      {isEmpty ? (
        <div className="rounded-2xl border border-dashed border-border/70 px-6 py-16 text-center text-slate-500">
          Savatchangiz bo‘sh. Avval mahsulotlarni qo‘shing.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-border/60 p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-sm text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  O‘chirish
                </Button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-slate-50/70 p-6">
            <div>
              <p className="text-sm text-slate-500">Umumiy narx</p>
              <p className="text-3xl font-bold text-slate-900">
                ${total.toFixed(2)}
              </p>
            </div>
            <Button
              onClick={handleCheckout}
              className="h-12 rounded-xl px-6 text-base font-semibold"
            >
              Sotib olish
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

