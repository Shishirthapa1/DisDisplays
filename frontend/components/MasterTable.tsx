// components/MasterTable.tsx
"use client";
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export interface Column<T> {
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
};


interface MasterTableProps<T> {
    columns: Column<T>[];
    rows: any[];
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    onView?: (row: any) => void;
}

export function MasterTable<T extends { id: string | number }>({
    columns,
    rows,
    onEdit,
    onDelete,
    onView,
}: MasterTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-md border border-gray-300">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.key)} className="px-4 py-2 font-semibold text-gray-700">
                                {col.label}
                            </th>
                        ))}
                        {(onEdit || onDelete || onView) && <th className="px-4 py-2">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={String(col.key)} className="px-4 py-2 max-w-[200px] truncate overlow-hidden whitespace-nowrap">
                                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                </td>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <td className="px-4 py-2 space-x-2 font-semibold lg:text-sm md:text-xs text-[10px]">
                                    {onView && (
                                        <button
                                            onClick={() => onView(row)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="text-green-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
