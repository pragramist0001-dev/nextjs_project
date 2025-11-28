import Header from "@/components/header";
import AdminDashboard from "@/components/admin-dashboard";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <Header />
        <AdminDashboard />
      </div>
    </main>
  );
}

