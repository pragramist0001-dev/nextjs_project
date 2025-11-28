import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-ring/80 hover:shadow-xl"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 300px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900">{product.name}</p>
        <p className="text-sm text-slate-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

