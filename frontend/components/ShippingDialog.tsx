"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useUpdateShippingMutation } from "@/redux/api/rest/mutation/otherApi";
import toast from "react-hot-toast";
import { z } from "zod";

interface ShippingDialogProps {
    shippingId: string;
    isOpen: boolean;
    onClose: () => void;
}

const shippingSchema = z.object({
    cost: z.number().min(0, "Shipping cost must be a positive number"),
    estimatedDays: z.number().min(1, "Estimated days must be at least 1"),
});

const ShippingDialog: React.FC<ShippingDialogProps> = ({
    isOpen,
    onClose,
    shippingId,
}) => {
    const [shippingCost, setShippingCost] = useState<number>(0);
    const [estimatedDays, setEstimatedDays] = useState<number>(3);
    const [errors, setErrors] = useState<{ cost?: string; estimatedDays?: string }>({});

    const [updateShipping, { isLoading }] = useUpdateShippingMutation();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // validate inputs
        const parsed = shippingSchema.safeParse({ cost: shippingCost, estimatedDays });
        if (!parsed.success) {
            const fieldErrors: any = {};
            parsed.error.issues.forEach((err) => {
                if (err.path[0] === "cost") fieldErrors.cost = err.message;
                if (err.path[0] === "estimatedDays") fieldErrors.estimatedDays = err.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});

        try {
            const res = await updateShipping({
                id: shippingId,
                cost: shippingCost,
                estimatedDays,
            }).unwrap();

            if (res?.success) {
                toast.success("Shipping details updated successfully!");
                onClose();
            } else {
                toast.error(res?.message || "Failed to update shipping.");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update shipping.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Update Shipping Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Shipping Cost */}
                    <div className="flex flex-col gap-2">
                        <label className="mb-1 text-sm font-medium text-[#141718]">Shipping Cost (AUD$)</label>
                        <input
                            type="number"
                            placeholder="Enter shipping cost"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={shippingCost}
                            onChange={(e) => setShippingCost(Number(e.target.value))}
                            disabled={isLoading}
                        />
                        {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
                    </div>

                    {/* Estimated Delivery Days */}
                    <div className="flex flex-col gap-2">
                        <label className="mb-1 text-sm font-medium text-[#141718]">Estimated Delivery Days</label>
                        <input
                            type="number"
                            placeholder="Enter estimated delivery days"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={estimatedDays}
                            onChange={(e) => setEstimatedDays(Number(e.target.value))}
                            disabled={isLoading}
                        />
                        {errors.estimatedDays && (
                            <p className="text-red-500 text-sm mt-1">{errors.estimatedDays}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-2 rounded-lg text-white font-medium transition ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {isLoading ? "Updating..." : "Update Shipping"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingDialog;
