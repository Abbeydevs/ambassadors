import { auth } from "@/auth";
import { AdminHeader } from "./components/header";
import { AdminSidebarNav } from "./components/sidebar-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-slate-700 bg-slate-900 sm:flex">
        <div className="flex items-center gap-2 h-14 px-6 border-b border-slate-700">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white text-lg">
            A
          </div>
          <span className="text-xl font-bold text-white">Ambassadors</span>
        </div>
        <div className="flex-1 overflow-auto py-4 px-4">
          <AdminSidebarNav />
        </div>
      </aside>

      <div className="flex flex-col sm:ml-64">
        <AdminHeader
          sessionUser={{
            name: session?.user?.name,
            email: session?.user?.email,
          }}
        />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
