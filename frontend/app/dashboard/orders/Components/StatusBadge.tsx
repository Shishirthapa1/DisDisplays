// components/StatusBadge.tsx
import React from "react";

interface StatusBadgeProps {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

const statusStyles: Record<StatusBadgeProps["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}>
            {status}
        </span>
    );
};
