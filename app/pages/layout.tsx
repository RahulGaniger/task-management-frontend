import Sidebar from "@/app/components/Sidebar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
