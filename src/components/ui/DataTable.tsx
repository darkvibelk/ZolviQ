"use client";

import React from "react";
import clsx from "clsx";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

export interface Column<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (row: T) => React.ReactNode;
    width?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    onRowClick,
}: DataTableProps<T>) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#020617]/40 backdrop-blur-md">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-slate-400">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={clsx(
                                    "px-6 py-4 font-medium uppercase tracking-wider text-xs select-none cursor-pointer hover:text-white transition-colors group",
                                    col.width
                                )}
                            >
                                <div className="flex items-center gap-1">
                                    {col.header}
                                    <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-50" />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            onClick={() => onRowClick && onRowClick(row)}
                            className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                        >
                            {columns.map((col, idx) => (
                                <td key={idx} className="px-6 py-4 text-slate-300 group-hover:text-slate-100 transition-colors">
                                    {col.cell ? col.cell(row) : (row[col.accessorKey] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 text-xs text-slate-500">
                <div>Showing {data.length} results</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}
