"use client";

import { useSelector } from "react-redux";
import CartItem from "@/app/(subroot)/cart/cartItem";
import { RootState } from "@/redux/store";

const CartTable = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.items);

  return (
    <table className="h-fit w-full">
      <thead className="border-b border-[#141718]">
        <tr className="text-left">
          <th className="pb-6 font-poppins lg:text-base md:text-sm text-xs font-semibold text-[#141718]">
            Product
          </th>
          <th className="hidden pb-6 text-center font-poppins lg:text-base md:text-sm text-xs font-semibold text-[#141718] sm:table-cell">
            Quantity
          </th>
          <th className="hidden pb-6 text-center font-poppins lg:text-base md:text-sm text-xs font-semibold text-[#141718] sm:table-cell">
            Price
          </th>
          <th className="hidden pb-6 text-center font-poppins lg:text-base md:text-sm text-xs font-semibold text-[#141718] sm:table-cell">
            Subtotal
          </th>
          <th className="hidden pb-6 text-center font-poppins lg:text-base md:text-sm text-xs font-semibold text-[#141718] sm:table-cell">
            Total (After Discount)
          </th>
        </tr>
      </thead>

      <tbody>
        {cartProducts.length > 0 ? (
          cartProducts.map((cart: any) => (
            <tr
              key={cart.id}
              className="border-b border-[#E8ECEF] last:border-b-0"
            >
              <CartItem product={cart} />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="py-6 text-center text-gray-500">
              Your cart is empty
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CartTable;
