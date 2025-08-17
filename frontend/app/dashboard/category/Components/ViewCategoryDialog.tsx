"use client";

import React from "react";

interface Category {
    name: string;
    description: string;
    image: string;
}

interface Props {
    open: boolean;
    category: Category | null;
    onClose: () => void;
}

const ViewCategoryDialog: React.FC<Props> = ({ open, category, onClose }) => {
    if (!open || !category) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-md w-[90%] max-w-md space-y-4">
                <h2 className="lg:text-lg md:text:base text-sm font-semibold border-b pb-2">Category Details</h2>

                <div className=" space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Name:</label>
                    <p className="text-gray-700">{category?.name}</p>
                </div>

                <div className="mb-3 space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                    <label className="font-medium">Description:</label>
                    <p className="text-gray-700 whitespace-pre-line">{category?.description}</p>
                </div>

                {category?.image && (
                    <div className="mb-3 space-y-[2px] lg:text-sm md:text-[13px] text-xs">
                        <label className="font-medium">Image:</label>
                        <img
                            src={category?.image}
                            alt="Category"
                            className="mt-1 max-h-48 rounded object-cover border"
                        />
                    </div>
                )}

                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCategoryDialog;
