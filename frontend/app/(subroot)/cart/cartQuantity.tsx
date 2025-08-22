"use client";

import { Minus, Plus } from "lucide-react";

interface CartQuantityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  quantity: number;
  onAddQuantity: () => void;
  onMinusQuantity: () => void;
}

const CartQuantity: React.FC<CartQuantityProps> = ({
  quantity,
  onAddQuantity,
  onMinusQuantity,
  ...props
}) => {
  return (
    <div
      {...props}
      className="flex w-full max-w-[100px] items-center justify-between rounded border border-[#6C7275] p-1 sm:p-2"
    >
      {/* Minus Button */}
      <button
        onClick={onMinusQuantity}
        disabled={quantity <= 1}
        className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed sm:h-7 sm:w-7"
      >
        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>

      {/* Quantity Display */}
      <span className="px-2 font-inter text-sm font-semibold text-[#141718] sm:text-base">
        {quantity}
      </span>

      {/* Plus Button */}
      <button
        onClick={onAddQuantity}
        className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200 sm:h-7 sm:w-7"
      >
        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </div>
  );
};

export default CartQuantity;
