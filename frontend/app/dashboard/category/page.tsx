"use client";
import { Column, MasterTable } from '@/components/MasterTable';
import React, { useState } from 'react'
import CategoryDialog from './Components/CategoryDialog';
import { useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from '@/redux/api/rest/mutation/otherApi';
import { toBase64 } from '@/hooks/toBase64';
import { useGetAllCategoriesQuery } from '@/redux/api/rest/query/queryApi';
import ViewCategoryDialog from './Components/ViewCategoryDialog';
import DeleteDialog from '@/components/DeleteDialog';
import toast from 'react-hot-toast';

const page = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);



    const [createCategory, { isLoading }] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const { data: categories, isLoading: isCategoriesLoading, isError } = useGetAllCategoriesQuery();

    const categoriesData = categories?.categories || [];
    const [deleteCategory] = useDeleteCategoryMutation();

    const columns: Column<{ id: string; name: string; description: string; image: string }>[] = [
        { key: "id", label: "id" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        {
            key: "image", label: "Image",
            render: (value) => (
                <img src={value || "N/A"} alt="Category" className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-6 h-6 object-cover rounded" />
            ),
        },
    ];

    const rows = categoriesData?.map((cat: any, index: number) => ({
        id: index + 1,
        _id: cat?._id ?? "N/A",
        description: cat?.description ?? "N/A",
        image: cat?.image ?? "N/A",
        name: cat?.name ?? "N/A",

    })) || [];

    const handleEdit = (row: any) => {
        setDialogMode("edit");
        setSelectedCategory({
            name: row?.name,
            description: row?.description,
            image: row?.image,
            _id: row?._id,
        });
        setDialogOpen(true);
    };

    const handleDelete = (row: any) => {
        setSelectedCategory(row);
        setIsDeleteDialogOpen(true);
    };
    const confirmDelete = async () => {
        try {
            await deleteCategory(selectedCategory?._id).unwrap();
            console.log("Category deleted");
            toast.success("Category deleted successfully!");
        } catch (err) {
            console.error("Failed to delete category:", err);
            toast.error("Failed to delete category.");
        }
        setIsDeleteDialogOpen(false);
    };
    const handleView = (row: any) => {
        setSelectedCategory(row);
        setViewDialogOpen(true);
    };

    const handleAddCategory = () => {
        setDialogMode("add");
        setSelectedCategory(null);
        setDialogOpen(true);
    }

    const handleSaveCategory = async (data: any) => {
        console.log("Saving category data:", data); // image is expected as base64 or URL

        const formData = {
            name: data.name,
            description: data.description,
            image: data.image || "", // Send base64 string or existing URL
        };

        try {
            if (dialogMode === "add") {
                const res = await createCategory(formData).unwrap();
                console.log("Category created:", res);
                toast.success("Category created successfully!");
            } else if (dialogMode === "edit" && selectedCategory?._id) {
                const res = await updateCategory({ id: selectedCategory._id, formData }).unwrap();
                console.log("Category updated:", res);
                toast.success("Category updated successfully!");

            }
        } catch (err) {
            console.error(`Error ${dialogMode === "add" ? "creating" : "updating"} category:`, err);
            toast.error(`Failed to ${dialogMode === "add" ? "create" : "update"} category.`);
        }

        setDialogOpen(false);
    };


    if (isCategoriesLoading) return <p>Loading categories...</p>;
    if (isError) return <p>Error loading categories.</p>;


    return (
        <div>
            <div className='flex flex-row justify-between items-center mb-4'>
                <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-800 '>Category List</p>
                <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">Add Category</button>
            </div>
            <MasterTable
                columns={columns}
                rows={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />
            <CategoryDialog
                open={dialogOpen}
                mode={dialogMode}
                categoryData={selectedCategory}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveCategory}
            />
            <ViewCategoryDialog
                open={viewDialogOpen}
                category={selectedCategory}
                onClose={() => setViewDialogOpen(false)}
            />
            <DeleteDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category?"
            />
        </div>
    )
}

export default page
