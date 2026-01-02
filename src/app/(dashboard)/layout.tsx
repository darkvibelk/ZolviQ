import { Sidebar } from "@/components/layout/Sidebar";
import { Bell, Search } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-brand-cyan/30">
            <Sidebar />

            {/* Main Content Area */}
            <main className="ml-64 min-h-screen flex flex-col relative">

                {/* Topbar */}
                <header className="sticky top-0 z-40 h-16 px-8 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
                    {/* Breadcrumbs / Title Placeholder */}
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Workspace</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-slate-200 font-medium">Dashboard</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-[#020617]" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>

            </main>
        </div>
    );
}
