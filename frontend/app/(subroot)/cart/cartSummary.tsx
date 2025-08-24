"use client";

// packages
import { useState } from "react";
import { useSelector } from "react-redux";

// lib
import { cn } from "@/lib/utils";
import { selectSubtotal, selectTotal, selectTotalDiscount } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

// redux selectors




const CartSummary = () => {
  const subtotal: number = useSelector(selectSubtotal);
  const total: number = useSelector(selectTotal);
  const totalDiscount: number = useSelector(selectTotalDiscount);
  const router = useRouter();

  const cartProducts = useSelector((state: RootState) => state.cart.items);
  console.log("Cart Products in Summary:", cartProducts);

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed to checkout.");
      return;
    }
    router.push("/checkout");
  }

  return (
    <div className="h-fit w-full space-y-4 rounded-md border border-[#6C7275] p-4 lg:p-6">
      <p className="font-poppins text-lg font-semibold text-[#141718]">
        Cart summary
      </p>


      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-[#EAEAEA] py-3">
            <p className="font-inter text-sm font-medium text-[#141718]">
              Subtotal
            </p>
            <p className="font-inter text-sm font-medium text-[#141718]">
              ${subtotal.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between border-b border-[#EAEAEA] py-3">
            <p className="font-inter text-sm font-medium text-[#141718]">
              Discount
            </p>
            <p className="font-inter text-sm font-medium text-[#141718]">
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

        <button onClick={handleCheckout} className="w-full rounded-lg bg-[#141718] px-6 py-2.5 font-inter text-lg font-medium text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
