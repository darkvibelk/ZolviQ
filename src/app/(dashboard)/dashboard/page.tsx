"use client";

import React from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Plus, Filter, RefreshCw } from "lucide-react";
import clsx from "clsx";

// --- Types ---
type Ticket = {
    id: string;
    subject: string;
    requester: string;
    assignee: string;
    status: "new" | "open" | "pending" | "resolved" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    last_updated: string;
};

// --- Dummy Data ---
const TICKETS: Ticket[] = [
    { id: "T-1024", subject: "VPN Connection Failed", requester: "Sarah Jenkins", assignee: "Unassigned", status: "new", priority: "high", last_updated: "2 min ago" },
    { id: "T-1023", subject: "Outlook Crashing on Startup", requester: "Mike Ross", assignee: "John Doe", status: "open", priority: "medium", last_updated: "15 min ago" },
    { id: "T-1022", subject: "System Outage: ERP Cluster B", requester: "System Alert", assignee: "DevOps Team", status: "new", priority: "critical", last_updated: "1 min ago" },
    { id: "T-1021", subject: "New Employee Onboarding - Jane", requester: "HR Dept", assignee: "John Doe", status: "pending", priority: "low", last_updated: "1 hour ago" },
    { id: "T-1020", subject: "Printer 4F Jammed", requester: "Bob Smith", assignee: "Unassigned", status: "open", priority: "low", last_updated: "2 hours ago" },
    { id: "T-1019", subject: "Access Request: AWS Prod", requester: "Alice Chen", assignee: "Security Team", status: "pending", priority: "high", last_updated: "3 hours ago" },
    { id: "T-1018", subject: "Monitor Flickering", requester: "Dave Wilson", assignee: "Unassigned", status: "resolved", priority: "medium", last_updated: "1 day ago" },
    { id: "T-1017", subject: "Password Reset", requester: "Guest User", assignee: "Auto-Bot", status: "closed", priority: "low", last_updated: "2 days ago" },
];

export default function DashboardPage() {

    const columns: Column<Ticket>[] = [
        {
            header: "ID",
            accessorKey: "id",
            width: "w-24",
            cell: (row) => <span className="font-mono text-xs text-brand-cyan">{row.id}</span>
        },
        {
            header: "Subject",
            accessorKey: "subject",
            cell: (row) => <span className="font-medium text-slate-200">{row.subject}</span>
        },
        { header: "Requester", accessorKey: "requester" },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row) => {
                const colors = {
                    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    open: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    resolved: "bg-slate-500/10 text-slate-400 border-slate-500/20",
                    closed: "bg-slate-800/50 text-slate-600 border-slate-700/50",
                };
                return (
                    <span className={clsx("px-2 py-1 rounded-full text-xs font-medium border uppercase tracking-wide", colors[row.status])}>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: "Priority",
            accessorKey: "priority",
            cell: (row) => {
                const colors = {
                    critical: "text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse font-bold",
                    high: "text-orange-400 font-semibold",
                    medium: "text-yellow-400",
                    low: "text-slate-400",
                };
                return (
                    <div className="flex items-center gap-2">
                        <div className={clsx("w-2 h-2 rounded-full bg-current", colors[row.priority])} />
                        <span className={clsx("text-xs uppercase", colors[row.priority])}>{row.priority}</span>
                    </div>
                );
            }
        },
        {
            header: "Assignee",
            accessorKey: "assignee",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 border border-white/5">
                        {row.assignee.charAt(0)}
                    </div>
                    <span className="text-slate-400">{row.assignee}</span>
                </div>
            )
        },
        { header: "Updated", accessorKey: "last_updated", cell: (row) => <span className="text-slate-500 text-xs">{row.last_updated}</span> },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Ticket Console
                    </h1>
                    <p className="text-brand-cyan/80 text-sm font-mono mt-1">
                        ⚡ LIVE FEED • <span className="text-slate-500">Updating in real-time</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-sm font-medium hover:bg-slate-700/50 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-cyan hover:bg-blue-600 text-black font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">
                        <Plus size={18} /> New Ticket
                    </button>
                </div>
            </div>

            {/* Stats Cards (quick overview) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Unassigned", value: "12", color: "text-yellow-400" },
                    { label: "Critical", value: "3", color: "text-red-500" },
                    { label: "My Work", value: "8", color: "text-brand-cyan" },
                    { label: "SLA Breached", value: "1", color: "text-rose-400" },
                ].map((stat) => (
                    <div key={stat.label} className="glass-panel p-4 rounded-xl flex flex-col items-start hover:bg-white/5 transition-colors cursor-pointer">
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{stat.label}</span>
                        <span className={clsx("text-3xl font-bold mt-1", stat.color)}>{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={TICKETS} />
        </div>
    );
}
