"use client";

// package
import { useState } from "react";
import Image from "next/image";


// lib
import { cn, formatCurrency } from "@/lib/utils";

// ui
import CartQuantity from "@/app/(subroot)/cart/cartQuantity";

import { useDispatch } from "react-redux";
import { updateQuantity } from "@/redux/slices/cartSlice";
import CartItemAction from "./cartItemAction";

export type CartItemProps = {
  product: {
    id: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
    discount: number;
    stock: number;
  };
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch();
  const quantity = product.quantity;


  const basePrice = formatCurrency(product.price);

  const priceAfterDiscount = product.discount > 0
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const totalPrice = product.price * quantity;
  const totalPriceAfterDiscount = priceAfterDiscount * quantity;

  // Formatted strings for display
  const basePriceFormatted = formatCurrency(product.price);
  const totalPriceFormatted = formatCurrency(totalPrice);
  const totalPriceAfterDiscountFormatted = formatCurrency(totalPriceAfterDiscount);


  const handleMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  const handleAddQuantity = () => {
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  return (
    <>
      <td
        className={cn("py-6 sm:w-6/12", "opacity-100")}
      >
        <div className="flex items-start gap-4">
          {/* <div
            onClick={handleCheck}
            className={cn(
              "hidden h-5 w-5 flex-none cursor-pointer items-center justify-center rounded border border-[#141718] sm:flex",
              check ? "bg-[#141718]" : "bg-white",
            )}
          >
            {check && (
              <Check
                stroke="#ffffff"
                strokeWidth={2.5}
                className="h-3.5 w-3.5"
              />
            )}
          </div> */}

          <div className="flex gap-4 sm:items-center">
            <div className="h-[100px] min-w-[90px] bg-[#F3F5F7]">
              <Image
                src={product.image}
                alt={product.name}
                width={231}
                height={308}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-start justify-between gap-1">
                <p className="line-clamp-2 max-w-10 font-inter text-xs md:text-sm font-semibold text-[#141718] lg:text-base">
                  {product.name}
                </p>
                <p className="font-inter md:text-xs text-[11px] lg:text-sm font-semibold text-[#141718] sm:hidden">
                  {basePrice}
                </p>
                <div className="flex flex-row flex-wrap gap-3">
                  <p className="font-inter md:text-xs text-[11px] lg:text-sm font-semibold text-[#141718] sm:hidden">
                    {totalPriceFormatted}
                  </p>
                  <p className="font-inter md:text-xs text-[11px] lg:text-sm font-semibold text-[#141718] sm:hidden">
                    {totalPriceAfterDiscountFormatted}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* <p className="font-inter text-xs font-normal text-[#6C7275] md:text-sm">
                  Color: {product.color}
                </p> */}

                <div className="sm:hidden flex items-center justify-center">
                  <CartItemAction id={product.id} />

                </div>
              </div>

              <div className="flex items-center justify-between sm:hidden">
                <CartQuantity
                  quantity={quantity}
                  onMinusQuantity={handleMinusQuantity}
                  onAddQuantity={handleAddQuantity}


                />

                {/* <div
                  onClick={handleCheck}
                  className={cn(
                    "flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-[#141718]",
                    check ? "bg-[#141718]" : "bg-white",
                  )}
                >
                  {check && (
                    <Check
                      stroke="#ffffff"
                      strokeWidth={2.5}
                      className="h-3 w-3"
                    />
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td
        className={cn(
          "hidden w-2/12 py-6 sm:table-cell opacity-100"
        )}
      >
        <div className="flex justify-center">
          <CartQuantity
            quantity={quantity}
            onMinusQuantity={handleMinusQuantity}
            onAddQuantity={handleAddQuantity}

          />
        </div>
      </td>
      <td
        className={cn(
          "hidden w-2/12 py-6 sm:table-cell opacity-100"
        )}
      >
        <p className="text-center font-inter lg:text-base md:text-sm text-xs font-normal text-[#141718]">
          {basePrice}
        </p>
      </td>
      <td
        className={cn(
          " w-2/12 py-6 hidden sm:table-cell opacity-100"
        )}
      >
        <p className="text-center font-inter lg:text-base md:text-sm text-xs font-semibold text-[#141718]">
          {totalPriceFormatted}
        </p>

      </td>
      <td
        className={cn(
          " w-2/12 py-6 hidden sm:table-cell opacity-100"
        )}
      >
        <p className="text-center font-inter lg:text-base md:text-sm text-xs font-semibold text-[#141718]">
          {totalPriceAfterDiscountFormatted}
        </p>
      </td>
      <td
        className={cn(
          "hidden items-center justify-center sm:table-cell opacity-100"
        )}
      >
        <CartItemAction id={product.id} />

      </td>
    </>
  );
};

export default CartItem;
