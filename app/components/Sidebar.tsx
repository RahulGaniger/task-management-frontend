"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Inbox, CalendarDays, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-slate-200 flex flex-col">
      <div className="px-5 pt-4 pb-6">
        <h1 className="pt-4 text-lg font-semibold text-blue-600">
          Task Management App
        </h1>

        <p className="text-xs text-slate-400">Professional Task Management</p>
      </div>

      <nav className="space-y-1 px-2">
        <Link
          href="/pages/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
            isActive("/pages/dashboard")
              ? "bg-blue-100 text-blue-700"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Inbox size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/pages/tasks"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
            isActive("/pages/tasks")
              ? "bg-blue-100 text-blue-700"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <CalendarDays size={18} />
          <span>Tasks</span>
        </Link>
      </nav>

      <div className="absolute bottom-20 left-0 w-full px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 bg-red-500 text-white hover:bg-red-700 cursor-pointer transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
