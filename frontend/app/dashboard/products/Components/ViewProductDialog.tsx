"use client";

import React from "react";

interface Product {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    discount: number;
    category: string;
}

interface Props {
    open: boolean;
    product: Product | null;
    onClose: () => void;
}

const ViewProductDialog: React.FC<Props> = ({ open, product, onClose }) => {
    if (!open || !product) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-md w-[90%] max-w-md space-y-4">
                <h2 className="lg:text-lg md:text:base text-sm font-semibold border-b pb-2">Product Details</h2>

                <div className="space-y-1 lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Name:</label>
                    <p className="text-gray-700">{product.name}</p>
                </div>

                <div className="space-y-1 lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Description:</label>
                    <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>

                {product.image && (
                    <div className="space-y-1 lg:text-sm md:text-[13px] text-xs">
                        <label className="font-medium">Image:</label>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="mt-1 max-h-48 w-full object-cover rounded border"
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 lg:text-sm md:text-[13px] text-xs">
                    <div>
                        <label className="font-medium">Price:</label>
                        <p className="text-gray-700">Rs. {product.price}</p>
                    </div>
                    <div>
                        <label className="font-medium">Stock:</label>
                        <p className="text-gray-700">{product.stock} pcs</p>
                    </div>
                    <div>
                        <label className="font-medium">Discount:</label>
                        <p className="text-gray-700">{product.discount}%</p>
                    </div>
                    <div>
                        <label className="font-medium">Category:</label>
                        <p className="text-gray-700">{product.category}</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
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

export default ViewProductDialog;
