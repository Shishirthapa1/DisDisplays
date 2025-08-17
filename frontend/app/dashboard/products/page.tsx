"use client";
import { Column, MasterTable } from '@/components/MasterTable';
import React, { useState } from 'react'
import ProductDialog from './Components/ProductDialog';
import { useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } from '@/redux/api/rest/mutation/otherApi';
import { useGetAllProductsQuery } from '@/redux/api/rest/query/queryApi';
import ViewProductDialog from './Components/ViewProductDialog';
import DeleteDialog from '@/components/DeleteDialog';
import toast from 'react-hot-toast';

const page = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);



    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { data, isLoading: isProductsLoading, isError } = useGetAllProductsQuery();
    const products = data?.products || [];

    const [deleteProduct] = useDeleteProductMutation();

    const columns: Column<{ id: string; name: string; description: string; image: string; price: number, stock: number; discount: number; category: string; productType: string }>[] = [
        { key: "id", label: "id" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "price", label: "Price ($)" },
        { key: "stock", label: "Stock" },
        { key: "discount", label: "Discount (%)" },
        { key: "productType", label: "Product Type" },
        { key: "category", label: "Category" },
        {
            key: "image", label: "Image",
            render: (value) => (
                <img src={value || "N/A"} alt="product" className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-6 h-6 object-cover rounded" />
            ),
        },
    ];

    const rows = products?.map((product: any, index: number) => ({
        id: index + 1,
        _id: product?._id ?? "N/A",
        description: product?.description ?? "N/A",
        image: product?.image ?? "N/A",
        name: product?.name ?? "N/A",
        price: product?.price ?? 0,
        stock: product?.stock ?? 0,
        discount: product?.discount ?? 0,
        productType: !product?.productType ? "N/A" : product.productType,
        category: product?.category?.name ?? "N/A",

    })) || [];

    const handleEdit = (row: any) => {
        setDialogMode("edit");
        setSelectedProduct({
            name: row?.name,
            description: row?.description,
            image: row?.image,
            _id: row?._id,
            price: row?.price,
            stock: row?.stock,
            discount: row?.discount,
            category: row?.category?._id || "",
            productType: row?.productType || "",
        });
        setDialogOpen(true);
    };

    const handleDelete = (row: any) => {
        setSelectedProduct(row);
        setIsDeleteDialogOpen(true);
    };
    const confirmDelete = async () => {
        try {
            await deleteProduct(selectedProduct?._id).unwrap();
            console.log("Product deleted");
            toast.success("Product deleted successfully!");
        } catch (err) {
            console.error("Failed to delete Product:", err);
            toast.error("Failed to delete Product.");
        }
        setIsDeleteDialogOpen(false);
    };
    const handleView = (row: any) => {
        setSelectedProduct(row);
        setViewDialogOpen(true);
    };

    const handleAddProduct = () => {
        setDialogMode("add");
        setSelectedProduct(null);
        setDialogOpen(true);
    }

    const handleSaveProduct = async (data: any) => {
        console.log("Saving Product data:", data); // image is expected as base64 or URL

        const formData = {
            name: data.name,
            description: data.description,
            image: data.image || "",
            category: data.category || "",
            price: data.price || 0,
            stock: data.stock || 0,
            discount: data.discount || 0,
            productType: data.productType || "",
        };
        // Send base64 string or existing URL

        try {
            if (dialogMode === "add") {
                const res = await createProduct(formData).unwrap();
                console.log("Product created:", res);
                toast.success("Product created successfully!");
            } else if (dialogMode === "edit" && selectedProduct?._id) {
                const res = await updateProduct({ id: selectedProduct._id, formData }).unwrap();
                console.log("Product updated:", res);
                toast.success("Product updated successfully!");
            }
        } catch (err) {
            console.error(`Error ${dialogMode === "add" ? "creating" : "updating"} Product:`, err);
            toast.error(`Failed to ${dialogMode === "add" ? "create" : "update"} Product.`);
        }

        setDialogOpen(false);
    };


    if (isProductsLoading) return <p>Loading Products...</p>;
    if (isError) return <p>Error loading Pproducts.</p>;


    return (
        <div>
            <div className='flex flex-row justify-between items-center mb-4'>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 ">Product List</p>
                <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
            </div>
            <MasterTable
                columns={columns}
                rows={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <ProductDialog
                open={dialogOpen}
                mode={dialogMode}
                productData={selectedProduct}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveProduct}
            />

            <DeleteDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product?"
            />
            <ViewProductDialog
                onClose={() => setViewDialogOpen(false)}
                open={viewDialogOpen}
                product={selectedProduct}
            />
        </div>
    )
}

export default page
