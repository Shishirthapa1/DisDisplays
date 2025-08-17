"use client";
import { uploadToCloudinary } from "@/hooks/uploadToCloudinary";
import React, { useEffect, useState } from "react";
import { z } from "zod";

interface Category {
    name: string;
    description: string;
    image: string;
}

interface Props {
    open: boolean;
    mode: "add" | "edit";
    categoryData?: Category;
    onClose: () => void;
    onSave: (data: Category) => void;
}

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    description: z.string().min(5, "Description must be at least 5 characters").max(300, "Description too long"),
    image: z.string().optional(),
});

const CategoryDialog: React.FC<Props> = ({ open, mode, categoryData, onClose, onSave }) => {
    const [formData, setFormData] = useState<Category>({
        name: "",
        description: "",
        image: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof Category, string>>>({});
    const [isImageUploading, setIsImageUploading] = useState(false);

    useEffect(() => {
        if (mode === "edit" && categoryData) {
            setFormData(categoryData);
            setErrors({});

        } else {
            setFormData({ name: "", description: "", image: "" });
            setErrors({});

        }
    }, [mode, categoryData, open]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsImageUploading(true);

        try {
            const imageUrl = await uploadToCloudinary(file, "categories");
            setFormData((prev) => ({ ...prev, image: imageUrl }));
            setErrors((prev) => ({ ...prev, image: undefined }));
            setIsImageUploading(false);

            console.log("Image uploaded to Cloudinary:", imageUrl); // Add this log

        } catch (err) {
            console.error("Upload failed", err);
            setErrors((prev) => ({ ...prev, image: "Failed to upload image" }));

        }
    };

    const validateField = (field: keyof Category, value: string) => {
        try {
            // Pick the specific field schema from your main schema
            categorySchema.pick({ [field]: true }).parse({ [field]: value });
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        } catch (e) {
            if (e instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [field]: e.issues[0].message }));
            }
        }
    };

    const handleSubmit = () => {
        const result = categorySchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof Category, string>> = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof Category;
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-3 md:p-4 lg:p-6 space-y-3 overflow-y-auto max-h-[90vh]">
                <h2 className="lg:text-lg md:text-base text-sm font-semibold text-gray-800 mb-4">
                    {mode === "add" ? "Add Category" : "Edit Category"}
                </h2>

                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                            validateField("name", e.target.value);
                        }}
                    />
                    {errors.name && <p className="text-red-600 text-sm mb-2">{errors.name}</p>}
                </div>
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Description</label>
                    <textarea
                        placeholder="Description"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        value={formData.description}
                        onChange={(e) => {
                            setFormData({ ...formData, description: e.target.value })
                            validateField("description", e.target.value);
                        }}
                    />
                    {errors.description && <p className="text-red-600 text-sm mb-2">{errors.description}</p>}
                </div>
                <div>
                    <label className="block font-normal lg:text-base md:text-sm text-xs mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:text-[15px] md:text-[13px] text-[11px]"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-red-600 text-sm mb-2">{errors.image}</p>}

                    {formData.image && (
                        <img src={formData.image} alt="Preview" className="mb-3 max-h-40 object-cover" />
                    )}

                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={isImageUploading}
                        className={`px-4 py-2 rounded transition ${isImageUploading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}>
                        {isImageUploading ? "Uploading..." : mode === "add" ? "Add" : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryDialog;
