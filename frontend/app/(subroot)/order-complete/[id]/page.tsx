"use client";

"use client";
import { useParams } from "next/navigation";
import { CheckCircle2, MapPin } from "lucide-react";
import { useGetOrderByIdQuery } from "@/redux/api/rest/query/queryApi";

const OrderCompletePage = () => {
    const params = useParams();
    const orderId = params.id as string;

    const { data, isLoading, isError } = useGetOrderByIdQuery({ orderId });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading order details...</p>
            </div>
        );
    }

    if (isError || !data?.order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Failed to load order details.</p>
            </div>
        );
    }

    const { order } = data;

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
            {/* Success Banner */}
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 w-full max-w-2xl mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600 mb-2" />
                <h1 className="text-3xl font-bold text-[#141718]">Order Completed!</h1>
                <p className="text-gray-600 mt-1">
                    Thank you for your purchase. Your order has been successfully placed.
                    {/* <span className="font-semibold text-[#141718]">{order._id}</span>. */}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Customer Info */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="font-semibold text-lg border-b pb-2 mb-3">
                        Customer Info
                    </h2>
                    <div className="space-y-1 text-gray-700">
                        <p>
                            <span className="font-medium">Full Name:</span>{" "}
                            {order.user.fullname}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span> {order.user.email}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {order.user.phoneNumber}
                        </p>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-xl shadow p-5">
                    <div className="flex items-center gap-2 border-b pb-2 mb-3">
                        <MapPin stroke="#141718" className="h-5 w-5" />
                        <h2 className="font-semibold text-lg">Shipping Address</h2>
                    </div>
                    <div className="space-y-1 text-gray-700">
                        <p>
                            {order.shippingAddress.addressLine},{" "}
                            {order.shippingAddress.street}
                        </p>
                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                        <p>
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.country}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="w-full max-w-4xl bg-white rounded-xl shadow p-5 mt-6">
                <h2 className="font-semibold text-lg border-b pb-2 mb-4">
                    Order Summary
                </h2>
                <div className="flex items-center justify-between text-gray-700 mb-3">
                    <p>
                        <span className="font-medium">Total Amount:</span>
                    </p>
                    <p className="font-semibold text-[#141718]">
                        ${order.totalAmount.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center justify-between text-gray-700 mb-4">
                    <p>
                        <span className="font-medium">Status:</span>
                    </p>
                    <p className="capitalize">{order.status}</p>
                </div>

                <h3 className="font-medium text-md mb-3">Products</h3>
                <ul className="divide-y">
                    {order.products.map((p: any) => (
                        <li key={p._id} className="flex items-center gap-3 py-3">
                            <img
                                src={p.product.image}
                                alt={p.product.name}
                                className="w-14 h-14 object-cover rounded-lg border"
                            />
                            <div className="flex flex-col">
                                <p className="font-medium">{p.product.name}</p>
                                <p className="text-sm text-gray-600">
                                    Quantity: {p.quantity}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default OrderCompletePage;