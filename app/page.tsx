
import Header from "@/components/header";
import ProductGrid from "@/components/product-grid";
import { getServerSupabaseClient } from "@/lib/supabase-server";
import { Product } from "@/lib/types";

export default async function Home() {
  const supabase = getServerSupabaseClient();
  
  let products: Product[] = [];
  
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      products = data as Product[];
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <Header />
        <section className="grid gap-6 rounded-3xl border border-border/60 bg-white/80 p-8 shadow-xl backdrop-blur-lg">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              Onlayn do‘kon
            </p>
            <h1 className="text-4xl font-bold text-slate-900">
              Eng so‘nggi mahsulotlarni online xarid qiling
            </h1>
            
          </div>
          <ProductGrid products={products} />
        </section>
      </div>
    </main>
  );
}
