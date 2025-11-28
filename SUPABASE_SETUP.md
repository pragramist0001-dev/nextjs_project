# Supabase Sozlash Qo'llanmasi

## 1. Supabase Hisob Yaratish

1. [https://supabase.com](https://supabase.com) ga kiring
2. "Start your project" tugmasini bosing
3. GitHub yoki Email orqali ro'yxatdan o'ting
4. "New Project" tugmasini bosing

## 2. Yangi Loyiha Yaratish

1. **Organization** tanlang (yoki yangi yarating)
2. **Project Name** kiriting (masalan: "nextshop")
3. **Database Password** yarating va saqlang (keyinroq kerak bo'ladi)
4. **Region** tanlang (eng yaqinini tanlang)
5. **Pricing Plan** tanlang (Free tier yetarli)
6. "Create new project" tugmasini bosing

## 3. Ma'lumotlar Bazasini Yaratish

### 3.1 SQL Editor'ga Kiring

1. Supabase Dashboard'da chap menudan **SQL Editor** ni tanlang
2. "New query" tugmasini bosing

### 3.2 Jadval Yaratish

Quyidagi SQL kodini kiritib, "Run" tugmasini bosing:

```sql
-- products jadvalini yaratish
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index yaratish
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Row Level Security (RLS) ni yoqish
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Barcha foydalanuvchilar mahsulotlarni o'qishi mumkin
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  USING (true);

-- Faqat autentifikatsiya qilingan foydalanuvchilar mahsulot qo'sha oladi
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

✅ "Success. No rows returned" xabari chiqishi kerak.

## 4. Authentication Sozlash

1. Chap menudan **Authentication** → **Providers** ga kiring
2. **Email** provider ni toping
3. **Enable Email provider** tugmasini yoqing
4. **Confirm email** ni o'chirib qo'yishingiz mumkin (development uchun)
5. "Save" tugmasini bosing

## 5. Admin Foydalanuvchi Yaratish

1. **Authentication** → **Users** ga kiring
2. "Add user" → "Create new user" tugmasini bosing
3. Quyidagilarni kiriting:
   - **Email**: admin@example.com (o'zingizning email)
   - **Password**: Kuchli parol kiriting
   - **Auto Confirm User**: ✅ (belgilang)
4. "Create user" tugmasini bosing

✅ Email va parolni yozib qo'ying - login qilish uchun kerak bo'ladi!

## 6. API Keys ni Olish

1. Chap menudan **Settings** → **API** ga kiring
2. Quyidagi ma'lumotlarni ko'rasiz:

### Project URL
- **NEXT_PUBLIC_SUPABASE_URL** - "Project URL" qismida

### API Keys
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** - "Project API keys" → `anon` `public` key
- **SUPABASE_SERVICE_ROLE_KEY** - "Project API keys" → `service_role` `secret` key

⚠️ **EHTIYOT**: `service_role` key ni hech qachon client-side kodda ishlatmang!

## 7. Environment Variables Sozlash

### 7.1 .env.local Faylini Yarating

Loyiha ildizida `.env.local` faylini yarating:

```bash
# Windows PowerShell'da:
New-Item .env.local

# yoki oddiy text editor'da yarating
```

### 7.2 Qiymatlarni Qo'shing

`.env.local` fayliga quyidagilarni kiriting:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Qayerdan topish:**
- Supabase Dashboard → Settings → API
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- service_role secret key → `SUPABASE_SERVICE_ROLE_KEY`

## 8. Test Qilish

1. Development server ni ishga tushiring:
   ```bash
   npm run dev
   ```

2. Brauzerda [http://localhost:3000](http://localhost:3000) ni oching

3. **Login qilish:**
   - `/login` sahifasiga kiring
   - Yaratgan admin email va parolni kiriting
   - `/admin` sahifasiga o'tadi

4. **Mahsulot qo'shish:**
   - Admin dashboard'da forma to'ldiring
   - "Mahsulotni saqlash" tugmasini bosing
   - Homepage'da yangi mahsulot ko'rinishi kerak

## 9. Muammolarni Hal Qilish

### Xatolik: "Supabase sozlanmagan"
- `.env.local` fayl mavjudligini tekshiring
- Environment variables to'g'ri kirilganligini tekshiring
- Server ni qayta ishga tushiring

### Xatolik: "Products are viewable by everyone" policy already exists
- SQL Editor'da quyidagi kodni ishga tushiring:
  ```sql
  DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
  DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
  ```
- Keyin qayta policy'larni yarating

### Login ishlamayapti
- Authentication → Providers → Email yoqilganligini tekshiring
- Foydalanuvchi yaratilganligini tekshiring (Authentication → Users)
- Email va parol to'g'ri ekanligini tekshiring

## 10. Tayyor!

Endi sizning onlayn do'koningiz ishga tayyor! 🎉

**Keyingi qadamlar:**
- Admin dashboard orqali mahsulotlar qo'shing
- Homepage'da mahsulotlarni ko'ring
- Savatchaga qo'shib, xarid qiling

