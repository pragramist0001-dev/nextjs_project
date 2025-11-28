import { NextResponse } from "next/server";
import { getServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase sozlanmagan" },
      { status: 500 }
    );
  }
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase sozlanmagan" },
      { status: 500 }
    );
  }
  const payload = await request.json();
  const requiredFields = ["name", "price", "image_url", "description"];
  const missing = requiredFields.filter((field) => !payload[field]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Quyidagi maydonlar to‘ldirilishi kerak: ${missing.join(", ")}` },
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: payload.name,
      price: payload.price,
      image_url: payload.image_url,
      description: payload.description,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

