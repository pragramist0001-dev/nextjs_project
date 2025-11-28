import Header from "@/components/header";
import ProductDetail from "@/components/product-detail";
import { getServerSupabaseClient } from "@/lib/supabase-server";
import { Product } from "@/lib/types";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const { id } = params;
  const supabase = getServerSupabaseClient();
  
  if (!supabase) {
    notFound();
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <Header />
        <ProductDetail product={data as Product} />
      </div>
    </main>
  );
}

