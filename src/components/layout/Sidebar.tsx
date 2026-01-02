"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
    LayoutDashboard,
    Inbox,
    Ticket,
    Users,
    Settings,
    LogOut,
    Zap
} from "lucide-react";
import { Logo } from "@/components/common/Logo";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Work", href: "/dashboard/my-work", icon: Inbox },
    { label: "Tickets", href: "/dashboard/tickets", icon: Ticket },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 glass-panel z-50 flex flex-col transition-all duration-300">
            {/* Header */}
            <div className="h-20 flex items-center justify-center border-b border-white/5">
                <Logo size="sm" className="scale-75 origin-center" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-brand-cyan/10 text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.1)] border border-brand-cyan/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                            )}
                        >
                            <Icon size={18} className={clsx(isActive ? "text-brand-cyan" : "text-slate-500 group-hover:text-slate-300")} />
                            <span>{item.label}</span>

                            {isActive && (
                                <div className="ml-auto w-1 h-1 rounded-full bg-brand-cyan shadow-[0_0_5px_#06b6d4]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center text-xs font-bold text-white ring-2 ring-black">
                        JD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-slate-200 truncate">John Doe</p>
                        <p className="text-xs text-slate-500 truncate">Admin</p>
                    </div>
                    <LogOut size={16} className="text-slate-600 group-hover:text-red-400 transition-colors" />
                </div>
            </div>
        </aside>
    );
};
