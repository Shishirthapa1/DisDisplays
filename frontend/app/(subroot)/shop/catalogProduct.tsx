"use client";

// ui
import { WishlistIcon } from "@/ui/assets/svg";
import * as ProductCard from "@/ui/card/productCard";

// stores
import { useProductDetail } from "@/stores/zustand";

// data
import products from "@/data/product.json";

// lib
import { cn } from "@/lib/utils";
import { use } from "react";
import { useGetAllProductsQuery, useGetProductsByCategoryQuery } from "@/redux/api/rest/query/queryApi";
import Link from "next/link";
import { PackageX } from "lucide-react";

const CatalogProduct = ({ categoryId }: { categoryId: string | null }) => {
    const showDetail = useProductDetail((state) => state.showDetail);

    const { data: productsByCategory, isLoading: loadingByCategory } = useGetProductsByCategoryQuery(
        { categoryId: categoryId as string },
        { skip: !categoryId }
    );
    const { data: allProducts, isLoading: loadingAll } = useGetAllProductsQuery(
        undefined,
        { skip: categoryId !== null }
    );

    // Choose products data based on categoryId
    const productsData = categoryId ? productsByCategory?.products || [] : allProducts?.products || [];
    const isLoading = categoryId ? loadingByCategory : loadingAll;

    if (isLoading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="space-y-8 py-20 pt-8 lg:space-y-20">
            <div
                className={cn(
                    "grid gap-x-2 gap-y-4 lg:gap-x-4 lg:gap-y-8",
                    showDetail
                        ? "grid-cols-1 lg:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
                )}
            >
                {productsData && productsData.length > 0 ? (
                    productsData.map((product: any) => (
                        <ProductCard.Root
                            key={product.id}
                            data={product}
                            className={
                                showDetail ? "sm:grid-cols-2 sm:place-items-center" : undefined
                            }
                        >
                            {/* product card thumbnail */}
                            <ProductCard.Thumbnail>
                                {/* badge */}
                                <ProductCard.ThumbnailBadge>
                                    <div className="space-y-1.5">
                                        <ProductCard.Badge>{product?.productType}</ProductCard.Badge>
                                        <ProductCard.Badge intent="discount">
                                            {product?.discount}% OFF
                                        </ProductCard.Badge>
                                    </div>

                                    {/* {!showDetail && <ProductCard.WishlistButton />} */}
                                </ProductCard.ThumbnailBadge>

                                {/* image */}
                                <Link href={`/products/${product._id}`}>
                                    <ProductCard.Image />
                                </Link>

                            </ProductCard.Thumbnail>

                            {/* product card content */}
                            <Link href={`/products/${product._id}`}>

                                <ProductCard.Content className="md:p-6">
                                    <div className="flex items-center justify-between gap-1">
                                        <ProductCard.Name />
                                        {/* <button
                                    className={`flex items-center justify-center p-1.5 md:hidden ${!showDetail && "hidden"
                                        }`}
                                >
                                    <WishlistIcon className="h-7 w-7" />
                                </button> */}
                                    </div>
                                    <ProductCard.Price />
                                    {showDetail && (
                                        <div className="space-y-4 pt-1 lg:space-y-6">
                                            <ProductCard.Description className="line-clamp-3 md:text-sm" />

                                            {/* <div className="flex flex-col gap-2">
                                        <ProductCard.Button
                                            width="full"
                                            fontSize="sm"
                                            className="lg:text-base"
                                        >
                                            Add to cart
                                        </ProductCard.Button>
                                        <ProductCard.Button
                                            variant="ghost"
                                            width="full"
                                            fontSize="sm"
                                            className="flex items-center justify-center gap-1 lg:text-base"
                                        >
                                            <WishlistIcon fill="#141718" className="h-5 w-5" />
                                            Wishlist
                                        </ProductCard.Button>
                                    </div> */}
                                        </div>
                                    )}
                                </ProductCard.Content>
                            </Link>
                        </ProductCard.Root>
                    ))
                ) : (


                    <div className="col-span-full flex flex-col items-center justify-center h-40 w-full rounded-xl bg-gray-50 p-6">
                        <PackageX className="h-10 w-10 text-red-400 mb-3" />
                        <h3 className="lg:text-xl md:text-lg text-base font-medium text-gray-700">No Products Found</h3>
                        <p className="lg:text-base md:text-sm text-xs text-gray-500 mt-3 font-semibold text-center">
                            There are no products available in this category right now.
                            Please check back later or explore other categories.
                        </p>
                    </div>

                )}
            </div>

            {/* <div className="flex justify-center">
                <button className="rounded-full border border-[#141718] px-10 py-1.5 font-inter text-base font-medium text-[#141718]">
                    Show more
                </button>
            </div> */}
        </div>
    );
};

export default CatalogProduct;
