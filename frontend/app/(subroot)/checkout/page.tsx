"use client";

import { z } from "zod";
import { ChevronLeft, MapPin } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import { DiscountIcon } from "@/ui/assets/svg";
import PaymentMethod from "@/app/(subroot)/checkout/checkoutPaymentMethod";
import CheckoutOrders from "@/app/(subroot)/checkout/checkoutOrders";
import CheckoutForm from "./TestCheckout";
import { useSelector } from "react-redux";
import { clearCart, selectSubtotal, selectTotal, selectTotalDiscount } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useCreateOrderMutation, useCreateProductMutation } from "@/redux/api/rest/mutation/otherApi";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(stripePublishableKey);


export default function Page() {
  const subtotal: number = useSelector(selectSubtotal);
  const total: number = useSelector(selectTotal);
  const totalDiscount: number = useSelector(selectTotalDiscount);

  const router = useRouter();
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const cartProducts = useSelector((state: RootState) => state.cart.items);
  console.log("Cart Products:", cartProducts);

  const orderData =
    cartProducts.map(item => ({
      product: item?.id,
      quantity: item?.quantity,
    }))
    ;

  const [submitOrder, setSubmitOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const shippingAddressSchema = z.object({
    addressLine: z.string().min(1, "Address Line is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "ZIP / Postal Code is required"),
    country: z.string().min(1, "Country is required"),
  });

  const userSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
  });

  const orderSchema = z.object({
    user: userSchema,
    shippingAddress: shippingAddressSchema,
    products: z
      .array(
        z.object({
          product: z.string().min(1),
          quantity: z.number().min(1),
        })
      )
      .min(1, "At least one product is required"),
    totalAmount: z.number().min(1, "Total amount must be greater than 0"),
  });

  const [formData, setFormData] = useState({
    user: {
      fullname: "",
      email: "",
      phoneNumber: "",
    },
    shippingAddress: {
      addressLine: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    products: orderData,
    totalAmount: total,
  });

  const handleOrderAfterPayment = async () => {
    const validation = orderSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      });

      setErrors(fieldErrors);
      toast.error("Please fix the highlighted errors");
      return;
    }
    setErrors({});

    try {
      const res = await createOrder(formData).unwrap();
      toast.success("Order created successfully!");
      console.log("Order created:", res);
      dispatch(clearCart());
      router.push("/order-complete/" + res?.order?._id);
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Failed to create order.");
      }
      console.error("Order creation error:", err);
    }

  };

  const handlePlaceOrder = () => {
    setSubmitOrder(true);
  }
  return (
    <SectionLayout className="relative px-8 py-20">
      <div className="absolute left-8 top-4 inline-flex items-center gap-1 align-baseline lg:hidden">
        <ChevronLeft stroke="#605F5F" className="h-3 w-3" />
        <p className="font-inter text-sm font-medium text-[#605F5F]">back</p>
      </div>

      <div className="space-y-6 pb-20 lg:space-y-10">
        <h1 className="text-center font-poppins text-[40px] font-medium text-[#141718]">
          Check Out
        </h1>
        <div className="flex items-center justify-center gap-4 align-baseline">
          <p className="relative line-clamp-1 pr-4 font-inter text-sm font-medium text-[#38CB89] before:absolute before:right-0 before:content-['/']">
            <span className="mr-2 hidden h-6 w-6 items-center justify-center rounded-full bg-[#38CB89] font-inter text-xs text-white md:inline-flex">
              1
            </span>
            Shopping cart
          </p>
          <p className="relative min-w-max pr-4 font-inter text-sm font-normal text-[#141718] before:absolute before:right-0 before:content-['/']">
            <span className="mr-2 hidden h-6 w-6 items-center justify-center rounded-full bg-[#141718] font-inter text-xs text-white md:inline-flex">
              2
            </span>
            Checkout details
          </p>
          <p className="relative line-clamp-1 pr-4 font-inter text-sm font-normal text-[#605F5F] before:absolute before:right-0 before:content-['/'] last:before:content-['']">
            <span className="mr-2 hidden h-6 w-6 items-center justify-center rounded-full bg-[#605F5F] font-inter text-xs text-white md:inline-flex">
              3
            </span>
            Order complete
          </p>
        </div>
      </div>

      <div className="grid gap-y-6 lg:grid-cols-[2fr_1fr] lg:gap-x-8 xl:gap-x-16">
        <div className="space-y-6">
          <div className="space-y-6 rounded-md border border-[#6C7275] p-6">
            <p className="font-poppins text-lg font-semibold text-[#141718]">
              Shipping Information
            </p>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-[#141718]">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.user.fullname}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      user: { ...prev.user, fullname: e.target.value },
                    }))
                  }
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#6C7275] focus:ring-[#141718]"
                    }`}
                />
                {errors["user.fullname"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["user.fullname"]}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-[#141718]">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +044 04682732"
                  value={formData.user.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      user: { ...prev.user, phoneNumber: e.target.value },
                    }))
                  }
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#6C7275] focus:ring-[#141718]"
                    }`}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-[#141718]">Email</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.user.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      user: { ...prev.user, email: e.target.value },
                    }))
                  }
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#6C7275] focus:ring-[#141718]"
                    }`}
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin stroke="#141718" className="h-4 w-4" />
                  <p className="font-inter text-sm font-semibold text-[#141718]">
                    Shipping Address
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-[#141718]">Address Line</label>
                    <input
                      type="text"
                      placeholder="Address Line"
                      value={formData.shippingAddress.addressLine}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, addressLine: e.target.value },
                        }))
                      }
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#6C7275] focus:ring-[#141718]"
                        }`}
                    />
                  </div>
                  {/* Street */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-[#141718]">Street</label>
                    <input
                      type="text"
                      placeholder="Street address"
                      value={formData.shippingAddress.street}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, street: e.target.value },
                        }))
                      }
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#6C7275] focus:ring-[#141718]"
                        }`}
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-[#141718]">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, city: e.target.value },
                        }))
                      }
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#6C7275] focus:ring-[#141718]"
                        }`}
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-[#141718]">State</label>
                    <input
                      type="text"
                      placeholder="State/Province"
                      value={formData.shippingAddress.state}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, state: e.target.value },
                        }))
                      }
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#6C7275] focus:ring-[#141718]"
                        }`}
                    />
                  </div>

                  {/* Zip */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-[#141718]">ZIP Code</label>
                    <input
                      type="text"
                      placeholder="ZIP / Postal Code"
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, postalCode: e.target.value },
                        }))
                      }
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#6C7275] focus:ring-[#141718]"
                        }`}
                    />
                  </div>

                  {/* Country (full width on sm) */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-[#141718]">Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={formData.shippingAddress.country}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, country: e.target.value },
                        }))
                      }
                      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${errors["user.fullname"]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#6C7275] focus:ring-[#141718]"
                        }`}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <CheckoutOrders />


        </div>

        <div className="h-fit space-y-6">
          <div className="space-y-6 rounded-md border border-[#6C7275] p-6">
            <p className="font-poppins text-lg font-semibold text-[#141718]">
              Order Summary
            </p>

            <div>


              <div className="flex items-center justify-between py-3">
                <p className="font-inter text-sm font-normal text-[#141718]">
                  Shipping
                </p>
                <p className="font-inter text-sm font-semibold text-[#141718]">
                  Free
                </p>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="font-inter text-sm font-normal text-[#141718]">
                  Subtotal
                </p>
                <p className="font-inter text-sm font-semibold text-[#141718]">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="font-poppins text-lg font-semibold text-[#141718]">
                  Discount
                </p>
                <p className="font-poppins text-lg font-semibold text-[#141718]">
                  ${totalDiscount.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="font-poppins text-lg font-semibold text-[#141718]">
                  Total
                </p>
                <p className="font-poppins text-lg font-semibold text-[#141718]">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm onPaymentSuccess={handleOrderAfterPayment} submit={submitOrder}
                setLoading={setLoading} />
            </Elements>
          </div>

          <button onClick={handlePlaceOrder}
            disabled={loading} className={`h-10 w-full rounded-md px-10 font-inter text-sm font-medium lg:h-[50px] lg:text-base
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#141718] text-white"}`}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
      {/* Wrap checkout form inside Stripe Elements */}
    </SectionLayout>
  );
}
