import { DashboardSidebar } from "./dashboard-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <MobileSidebar />
      <main className="flex-1 lg:ml-64 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {children}
      </main>
    </div>
  );
}

