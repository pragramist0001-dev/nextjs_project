## Next Shop – Supabase + Next.js Boilerplate

Modern e-commerce demo built with Next.js 16 (App Router), Tailwind CSS 4 beta utilities, and Supabase for auth + database. It ships with:

- Product grid, detail page, cart context, login + protected admin dashboard
- API routes (`/api/products`) that read/write to Supabase
- Supabase client wrappers for browser/server usage

Use this README to configure Supabase env vars locally and on your hosting provider (Vercel, Render, etc.).

---

## 1. Prerequisites

- Node.js 20+
- npm (bundled with Node)
- Supabase account with a project created (see `SUPABASE_SETUP.md` for full walkthrough)

---

## 2. Local Setup

```bash
git clone <your-repo-url>
cd my_project_1
npm install
```

### 2.1 Environment Variables

Create `.env.local` in the project root and paste the values from Supabase → Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

- `NEXT_PUBLIC_*` variables are safe for the browser (read-only access).
- `SUPABASE_SERVICE_ROLE_KEY` is **secret**; only the Next.js server (API routes, server actions) should use it. Never expose it to the client or commit it to git.

If you change `.env.local`, restart the dev server so Next.js picks up the new values.

### 2.2 Database / Auth

Follow the SQL + auth steps in `SUPABASE_SETUP.md`:

1. Create the `products` table and enable RLS.
2. Add select/insert policies (`Products are viewable...`, `Authenticated users can insert...`).
3. Enable Email auth provider and create an admin user.

---

## 3. Development

```bash
npm run dev
```

Visit `http://localhost:3000`. Key routes:

- `/` – storefront with products loaded from Supabase
- `/product/[id]` – product detail page
- `/cart` – cart view (client-side context)
- `/login` – Supabase email/password login form
- `/admin` – protected form to create products (requires logged-in session)
- `/api/products` – REST endpoint used by the admin form (GET/POST)

Troubleshooting tips:

- `Supabase sozlanmagan` – env vars missing or dev server needs restart.
- `row level security` errors – service role key absent; check `.env.local`.
- Build-time `module not found '@supabase/...` – run `npm install`.

---

## 4. Production Build

```bash
npm run build
npm run start   # serves the production build
```

---

## 5. Deployment (e.g., Vercel)

1. Push the repo to GitHub/GitLab.
2. Create a new project in Vercel and import the repo.
3. Under **Settings → Environment Variables**, add the same three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Trigger a deploy. Vercel will run `npm install && npm run build`.

> **Note:** Service role key must be stored as an encrypted env var on the hosting provider. Never hard-code it.

---

## 6. Additional Docs

- `SETUP_QUICK.md` – condensed Supabase + project bootstrap guide
- `SUPABASE_SETUP.md` – detailed step-by-step instructions with SQL
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Deploy Guide](https://nextjs.org/docs/app/building-your-application/deploying)

With env vars + Supabase policies correctly configured, you can log in, add products via the admin dashboard, and the storefront will update instantly. Happy shipping! 🚀
