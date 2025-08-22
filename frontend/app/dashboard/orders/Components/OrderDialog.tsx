"use client";
import { uploadToCloudinary } from "@/hooks/uploadToCloudinary";
import React, { useEffect, useState } from "react";
import { set, z } from "zod";

export interface Order {
    _id?: string;
    user?: {
        fullname: string;
        email: string;
        phoneNumber: string;
    };
    shippingAddress?: {
        street: string;
        addressLine: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    products?: {
        product: {
            _id: string;
            name: string;
            image: string;
        };
        quantity: number;
    }[];
    totalAmount?: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

interface Props {
    open: boolean;
    orderData?: Order;
    onClose: () => void;
    onSave: (data: Order) => void;
}

const orderSchema = z.object({
    status: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),

});

const OrderDialog: React.FC<Props> = ({ open, orderData, onClose, onSave }) => {
    const [formData, setFormData] = useState<Order>({
        status: "pending",
    });
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<Partial<Record<keyof Order, string>>>({});

    useEffect(() => {
        if (orderData) {
            setFormData(orderData);
            setErrors({});

        }
    }, [orderData, open]);



    const validateField = (field: keyof Order, value: string) => {
        try {
            orderSchema.pick({ [field]: true }).parse({ [field]: value });
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        } catch (e) {
            if (e instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [field]: e.issues[0].message }));
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        const result = orderSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof Order, string>> = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof Order;
                if (!fieldErrors[fieldName]) {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            setLoading(false);
            return;
        }
        setErrors({});
        await onSave(formData);
        setLoading(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-3 md:p-4 lg:p-6 space-y-3 overflow-y-auto max-h-[90vh]">
                <h2 className="lg:text-lg md:text-base text-sm font-semibold text-gray-800 mb-4">
                    Edit Category
                </h2>

                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Status</label>
                    <select
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        value={formData.status}
                        onChange={(e) => {
                            setFormData({ ...formData, status: e.target.value as Order["status"] });
                            validateField("status", e.target.value);
                        }}
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                    )}

                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-4 py-2 rounded transition 
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}  text-white`}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDialog;
