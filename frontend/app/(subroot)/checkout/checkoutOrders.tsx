"use client";

// package
import Image from "next/image";

// ui
import DeliveryOption from "@/app/(subroot)/checkout/deliveryOption";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



const CheckoutOrders = () => {
  const orders = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="space-y-6 rounded-md border border-[#6C7275] p-6">
      <p className="font-poppins text-lg font-semibold text-[#141718]">
        Orders
      </p>

      <div>
        {orders.map((order) => (
          <OrderItem key={order.id} data={order} />
        ))}
      </div>
    </div>
  );
};

const OrderItem = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E8ECEF] py-3 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="h-[96px] min-w-[80px] bg-[#F3F5F7] md:h-[120px] md:min-w-[100px]">
          <Image
            src={data.image}
            alt={data.name}
            width={231}
            height={308}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-start justify-between gap-8">
            <p className="line-clamp-1 font-inter text-sm font-semibold text-[#141718] sm:line-clamp-2 md:w-2/3">
              {data.name}
            </p>
            <p className="hidden min-w-max font-inter text-sm font-semibold text-[#141718] sm:block">
              {data.quantity} x {data.price.toFixed(2)}
            </p>
          </div>

          <p className="font-inter text-sm font-semibold text-[#141718] sm:hidden">
            {data.quantity} x {data.price.toFixed(2)}
          </p>

          <div className="hidden sm:block">
            <DeliveryOption />
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <DeliveryOption />
      </div>
    </div>
  );
};

export default CheckoutOrders;
