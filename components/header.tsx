"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-context";
import { getSupabaseClient } from "@/lib/supabase-client";

export default function Header() {
  const router = useRouter();
  const { count } = useCart();
  const supabase = getSupabaseClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleAuthClick = async () => {
    if (!supabase) return;
    if (isAuthenticated) {
      await supabase.auth.signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/80 bg-white/80 px-6 py-4 shadow-sm backdrop-blur">
      <Link href="/" className="text-xl font-bold text-slate-900">
        NextShop
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link className="transition hover:text-slate-900" href="/">
          Bosh sahifa
        </Link>
        <Link className="transition hover:text-slate-900" href="/cart">
          Savatcha ({count})
        </Link>
        <Link className="transition hover:text-slate-900" href="/admin">
          Admin
        </Link>
      </nav>
      <Button
        variant="secondary"
        className="rounded-xl px-4"
        onClick={handleAuthClick}
      >
        {isAuthenticated ? "Chiqish" : "Kirish"}
      </Button>
    </header>
  );
}

