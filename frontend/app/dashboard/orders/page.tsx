"use client";
import { Column, MasterTable } from '@/components/MasterTable';
import React, { useState } from 'react'
import { useUpdateCategoryMutation, useUpdateOrderMutation } from '@/redux/api/rest/mutation/otherApi';
import { useGetAllCategoriesQuery, useGetAllOrdersQuery } from '@/redux/api/rest/query/queryApi';
import toast from 'react-hot-toast';
import ViewOrderDialog from './Components/ViewOrderDialog';
import { StatusBadge } from './Components/StatusBadge';
import OrderDialog from './Components/OrderDialog';

const page = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    const { data: orders, isLoading: isCategoriesLoading, isError } = useGetAllOrdersQuery();

    const [updateOrder] = useUpdateOrderMutation();


    const orderData = orders?.orders || [];

    const columns: Column<{
        id: string;
        user: { fullname: string; email: string };
        totalAmount: number;
        status: string;
        createdAt: string;
    }>[] = [
            { key: "id", label: "id" },
            {
                key: "user.fullname",
                label: "Customer Name",
                render: (_, row) => row.user.fullname,
            },
            {
                key: "user.email",
                label: "Email",
                render: (_, row) => row.user.email,
            },
            {
                key: "totalAmount",
                label: "Total Amount",
                render: (value) => `$${value.toFixed(2)}`,
            },
            {
                key: "status",
                label: "Status",
                render: (value) => <StatusBadge status={value} />,

            },
            {
                key: "createdAt",
                label: "Created At",
                render: (value) => new Date(value).toLocaleDateString(),
            },
        ];

    const rows = orderData?.map((order: any, index: number) => ({
        id: index + 1,
        ...order,
    })) || [];



    const handleView = (row: any) => {
        setSelectedOrder(row);
        setViewDialogOpen(true);
    };

    const handleEdit = (row: any) => {
        setSelectedOrder({
            status: row?.status,
            _id: row?._id,
        });
        setDialogOpen(true);
    };

    const handleSaveCategory = async (data: any) => {
        console.log("Saving category data:", data);

        const formData = {
            status: data.status,

        };

        try {

            if (selectedOrder?._id) {
                const res = await updateOrder({ id: selectedOrder._id, formData }).unwrap();
                console.log("Order Status updated:", res);
                toast.success("Order Status Updated successfully!");

            }
        } catch (err) {
            console.error(`Error updating order:`, err);
            toast.error(`Failed to update category.`);
        }

        setDialogOpen(false);
    };


    if (isCategoriesLoading) return <p>Loading categories...</p>;
    if (isError) return <p>Error loading categories.</p>;


    return (
        <div>
            <div className='flex flex-row justify-between items-center mb-4'>
                <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-800 '>Order List</p>
                {/* <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">Add Category</button> */}
            </div>
            <MasterTable
                columns={columns}
                rows={rows}
                onEdit={handleEdit}
                onView={handleView}
            />
            <OrderDialog
                open={dialogOpen}
                orderData={selectedOrder}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveCategory}
            />
            <ViewOrderDialog
                open={viewDialogOpen}
                order={selectedOrder}
                onClose={() => setViewDialogOpen(false)}
            />

        </div>
    )
}

export default page
