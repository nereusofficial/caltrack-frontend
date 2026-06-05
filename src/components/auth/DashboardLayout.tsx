import React from "react";
import DashboardSidebar from "../../components/auth/DashboardSidebar";
import DashboardHeader from "../../components/auth/DashboardHeader";
import DashboardFooter from "../../components/auth/DashboardFooter";
import AuthCanvas from "../../components/auth/AuthCanvas";
import AuthStyles from "../../components/auth/AuthStyles";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="relative flex h-screen w-full overflow-hidden bg-[#010b16]">
    <AuthCanvas />

    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(0,80,180,0.07) 0%, transparent 70%)" }} />

    <DashboardSidebar />

    <div className="relative z-10 flex flex-1 flex-col min-w-0">
      <DashboardHeader />
      <main className="flex-1 overflow-hidden px-8 py-6">
        {children}
      </main>
      <DashboardFooter />
    </div>

    <AuthStyles />
  </div>
);

export default DashboardLayout;