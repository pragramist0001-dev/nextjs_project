import ProductCard from "@/components/product-card";
import { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 p-10 text-center text-slate-500">
        Hozircha mahsulotlar mavjud emas. Avval admin dashboard orqali mahsulot
        qo‘shing.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

