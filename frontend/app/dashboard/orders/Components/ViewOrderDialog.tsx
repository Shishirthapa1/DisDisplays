"use client";

import React from "react";

export interface Order {
    _id: string;
    user: {
        fullname: string;
        email: string;
        phoneNumber: string;
    };
    shippingAddress: {
        street: string;
        addressLine: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    products: {
        product: {
            _id: string;
            name: string;
            image: string;
        };
        quantity: number;
    }[];
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

interface Props {
    open: boolean;
    order: Order | null;
    onClose: () => void;
}

const ViewOrderDialog: React.FC<Props> = ({ open, order, onClose }) => {
    if (!open || !order) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-md w-[90%] max-w-md space-y-4">
                <h2 className="lg:text-lg md:text:base text-sm font-semibold border-b pb-2">
                    Order Details
                </h2>

                {/* Order ID */}
                <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Order ID:</label>
                    <p className="text-gray-700">{order?._id}</p>
                </div>

                {/* Customer Info */}
                <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Customer:</label>
                    <p className="text-gray-700">{order?.user?.fullname}</p>
                    <p className="text-gray-700">{order?.user?.email}</p>
                    <p className="text-gray-700">{order?.user?.phoneNumber}</p>
                </div>

                {/* Shipping Address */}
                <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Shipping Address:</label>
                    <p className="text-gray-700">
                        {order?.shippingAddress?.addressLine}, {order?.shippingAddress?.street}
                    </p>
                    <p className="text-gray-700">
                        {order?.shippingAddress?.city}, {order?.shippingAddress?.state}
                    </p>
                    <p className="text-gray-700">
                        {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
                    </p>
                </div>

                {/* Products */}
                <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Products:</label>
                    <ul className="space-y-2">
                        {order?.products?.map((p) => (
                            <li key={p?.product?._id} className="flex items-center gap-2">
                                <img
                                    src={p?.product?.image}
                                    alt={p?.product?.name}
                                    className="w-10 h-10 object-cover rounded border"
                                />
                                <div>
                                    <p className="font-medium">{p?.product?.name}</p>
                                    <p className="text-gray-600 text-xs">Quantity: {p?.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Summary */}
                <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Total Amount:</label>
                    <p className="text-gray-700">${order?.totalAmount?.toFixed(2)}</p>
                </div>

                <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Status:</label>
                    <p className="text-gray-700 capitalize">{order?.status}</p>
                </div>

                {/* Dates */}
                {order.createdAt && (
                    <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                        <label className="font-medium">Created At:</label>
                        <p className="text-gray-700">
                            {new Date(order?.createdAt).toLocaleString()}
                        </p>
                    </div>
                )}
                {order?.updatedAt && (
                    <div className="space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                        <label className="font-medium">Updated At:</label>
                        <p className="text-gray-700">
                            {new Date(order.updatedAt).toLocaleString()}
                        </p>
                    </div>
                )}

                {/* Close Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewOrderDialog;
