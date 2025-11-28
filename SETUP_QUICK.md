# Tezkor Sozlash (5 daqiqa)

## 1. Supabase Loyiha Yaratish
- [supabase.com](https://supabase.com) → New Project
- Project name va password kiriting

## 2. SQL Editor'da Jadval Yaratish
**SQL Editor** → Quyidagi kodni yozing va Run bosing:

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

## 3. Authentication Yoqish
**Authentication** → **Providers** → **Email** → Enable

## 4. Admin Yaratish
**Authentication** → **Users** → **Add user**
- Email: `admin@example.com`
- Password: (o'zingiz yarating)
- Auto Confirm: ✅

## 5. API Keys Olish
**Settings** → **API** → Quyidagilarni ko'chirib oling:
- Project URL
- anon public key
- service_role secret key

## 6. .env.local Fayl
Loyiha ildizida `.env.local` yarating:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## 7. Ishga Tushirish
```bash
npm run dev
```

✅ Tayyor! [http://localhost:3000](http://localhost:3000) ni oching.

