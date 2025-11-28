"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-context";
import type { Product } from "@/lib/types";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="grid gap-10 rounded-3xl border border-border/70 bg-white/80 p-8 shadow-lg backdrop-blur lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 600px"
          className="object-cover"
        />
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Mahsulot
          </p>
          <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
        </div>
        <p className="text-lg text-slate-600">{product.description}</p>
        <div className="text-3xl font-semibold text-slate-900">
          ${product.price.toFixed(2)}
        </div>
        <Button
          onClick={handleAdd}
          className="h-12 rounded-xl text-base font-semibold"
        >
          {added ? "Savatchaga qo‘shildi!" : "Savatchaga qo‘shish"}
        </Button>
      </div>
    </section>
  );
}

