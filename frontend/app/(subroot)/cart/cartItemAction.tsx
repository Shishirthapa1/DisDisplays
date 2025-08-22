"use client";

import { useDispatch } from "react-redux";
import { Trash } from "lucide-react"; // or any icon library you use
import { removeFromCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

type CartItemActionProps = {
    id: string;
};

const CartItemAction: React.FC<CartItemActionProps> = ({ id }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart(id));
        toast.success("Item removed from cart");
    };

    return (
        <div className="relative group flex w-full items-center justify-center cursor-pointer ">
            <Trash
                className="h-5 w-5 text-red-500"
                onClick={handleRemove}
            />
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden rounded bg-black px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
                Remove from cart
            </span>
        </div>
    );
};

export default CartItemAction;
