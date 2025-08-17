"use client";

import React from "react";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import { WishlistIcon } from "@/ui/assets/svg";
import Text from "@/ui/text";
import Button from "@/ui/button";

type ProductCardProps = {
    product: {
        _id: string;
        name: string;
        price: number;
        stock: number;
        discount: number;
        description: string;
        image: string;
        category: { name: string };
        productType: string;
    };
    className?: string;
};

export default function ProductCard({ product, className }: ProductCardProps) {
    return (
        <div className={cn("grid grid-cols-1 gap-3", className)}>
            {/* Thumbnail */}
            <div className="group relative flex h-[308px] w-full flex-col justify-between overflow-hidden bg-[#F3F5F7] p-3.5">
                {/* Top badges */}
                <div className="z-10 flex items-start justify-between">
                    {product.discount > 0 && (
                        <div className="bg-[#38CB89] text-white px-3.5 py-1 rounded font-inter text-base font-bold uppercase">
                            -{product.discount}%
                        </div>
                    )}
                    <button className="shadow-[rgba(15,15,15,0.12)] flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity duration-100 ease-out group-hover:opacity-100">
                        <WishlistIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    width={231}
                    height={308}
                    className="absolute left-0 top-0 z-0 h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="space-y-1">
                {/* Product type or category */}
                <Text size="xs" weight={500} color="gray">
                    {product.category?.name || product.productType}
                </Text>

                {/* Name */}
                <Text weight={600} color="black/800" className="line-clamp-1">
                    {product.name}
                </Text>

                {/* Price */}
                <Text size="sm" weight={600} color="black/800" className="line-clamp-1">
                    {formatCurrency(product.price)}
                </Text>

                {/* Description */}
                <Text size="xs" weight={400} color="gray" className="line-clamp-2">
                    {product.description}
                </Text>

                {/* Stock */}
                <Text size="xs" weight={400} color="gray">
                    Stock: {product.stock}
                </Text>

                {/* CTA */}
                <Button variant="primary" className="mt-2 w-full">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
