"use client";
import { uploadToCloudinary } from "@/hooks/uploadToCloudinary";
import { useGetAllCategoriesQuery } from "@/redux/api/rest/query/queryApi";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { z } from "zod";

interface Product {
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    stock: number;
    discount: number;
    productType?: string;
}

interface Props {
    open: boolean;
    mode: "add" | "edit";
    productData?: Product;
    onClose: () => void;
    onSave: (data: Product) => void;
}

const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    image: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    price: z.number().nonnegative("Price must be non-negative"),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
    productType: z.string().optional(),
});

const ProductDialog: React.FC<Props> = ({ open, mode, productData, onClose, onSave }) => {

    const { data: categoriesData, isLoading: isCategoriesLoading, isError } = useGetAllCategoriesQuery();
    const categories = categoriesData?.categories || [];
    const [formData, setFormData] = useState<Product>({
        name: "",
        description: "",
        image: "",
        category: "",
        price: 0,
        stock: 0,
        discount: 0,
        productType: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});
    const [isImageUploading, setIsImageUploading] = useState(false);

    const productType = [
        { title: 'Popular', value: "popular" },
        { title: 'Best Seller', value: "best-seller" },
        { title: 'New Arrival', value: "new-arrival" },
        { title: 'Featured', value: "featured" }
    ];

    useEffect(() => {
        if (mode === "edit" && productData) {
            setFormData(productData);
            setErrors({});

        } else {
            setFormData({
                name: "",
                description: "",
                image: "",
                category: "",
                price: 0,
                stock: 0,
                discount: 0,
                productType: "",
            });
            setErrors({});

        }
    }, [mode, productData, open]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsImageUploading(true);

        try {
            const imageUrl = await uploadToCloudinary(file, "products");
            setFormData((prev) => ({ ...prev, image: imageUrl }));
            setErrors((prev) => ({ ...prev, image: undefined }));
            setIsImageUploading(false);

            console.log("Image uploaded to Cloudinary:", imageUrl);

        } catch (err) {
            console.error("Upload failed", err);
            setErrors((prev) => ({ ...prev, image: "Failed to upload image" }));

        }
    };

    const validateField = (field: keyof Product, value: any) => {
        try {
            const parsed = productSchema.pick({ [field]: true }).parse({ [field]: value });
            setErrors((prev) => ({ ...prev, [field]: undefined }));

        } catch (e) {
            if (e instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [field]: e.issues[0].message }));
            }
        }
    };

    const handleSubmit = () => {
        const result = productSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof Product, string>> = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof Product;
                if (!fieldErrors[fieldName]) {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        onSave(formData);
    };



    if (!open) return null;
    if (isCategoriesLoading) return <p>Loading Products...</p>;
    if (isError) return <p>Error loading Pproducts.</p>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-3 md:p-4 lg:p-6 space-y-3 overflow-y-auto max-h-[90vh]">
                <h2 className="lg:text-lg md:text-base text-sm font-semibold text-gray-800 mb-4">
                    {mode === "add" ? "Add Category" : "Edit Category"}
                </h2>

                {/* Name */}
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            validateField("name", e.target.value);
                        }}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Description</label>
                    <textarea
                        placeholder="Description"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        value={formData.description}
                        onChange={(e) => {
                            setFormData({ ...formData, description: e.target.value });
                            validateField("description", e.target.value);
                        }}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Price (AUD$)</label>
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        value={formData.price}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setFormData({ ...formData, price: isNaN(value) ? 0 : value });
                            validateField("price", isNaN(value) ? 0 : value);
                        }}
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value });
                            validateField("category", e.target.value);
                        }}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                    >
                        <option value="">Select Category</option>
                        {categories?.map((category: any) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Product Type */}
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Product Type</label>
                    <select
                        value={formData.productType}
                        onChange={(e) => {
                            setFormData({ ...formData, productType: e.target.value });
                            validateField("productType", e.target.value);
                        }}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                    >
                        <option value="">Select ProductType</option>
                        {productType.map((type: any, index: number) => (
                            <option key={index} value={type.value}>
                                {type.title}
                            </option>
                        ))}
                    </select>
                    {errors.productType && <p className="text-red-500 text-sm mt-1">{errors.productType}</p>}
                </div>

                {/* Stock */}
                <div className="flex flex-row gap-2">
                    <div>
                        <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Stock</label>
                        <input
                            type="number"
                            placeholder="Stock"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                            value={formData.stock}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setFormData({ ...formData, stock: isNaN(value) ? 0 : value });
                                validateField("stock", isNaN(value) ? 0 : value);
                            }}
                        />
                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Discount (%)</label>
                        <input
                            type="number"
                            placeholder="Discount (%)"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                            value={formData.discount}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setFormData({ ...formData, discount: isNaN(value) ? 0 : value });
                                validateField("discount", isNaN(value) ? 0 : value);
                            }}
                        />
                        {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border rounded px-3 py-2"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

                    {formData.image && (
                        <img
                            src={formData.image}
                            alt="Preview"
                            className="mt-2 max-h-40 w-full object-cover rounded border"
                        />
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isImageUploading} //  Disable if image URL not ready
                        className={`px-4 py-2 rounded transition ${isImageUploading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {isImageUploading ? "Uploading..." : mode === "add" ? "Add" : "Update"}

                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductDialog;
