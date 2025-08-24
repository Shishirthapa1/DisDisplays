// package
"use client";
import { notFound } from "next/navigation";
import { MinusIcon, PlusIcon } from "lucide-react";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// lib
import { formatCurrency } from "@/lib/utils";


import { StarIcon, WishlistIcon } from "@/ui/assets/svg";
import Button from "@/ui/button";


import { useGetProductByIdQuery } from "@/redux/api/rest/query/queryApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProductDetail = ({ productId }: { productId: string }) => {

    const { data: productData, isLoading, isError } = useGetProductByIdQuery({ productId });

    const product = productData?.product;

    const dispatch = useDispatch();

    const cartProducts = useSelector((state: RootState) => state.cart.items);
    // console.log("Cart Products in Summary:", cartProducts);

    const cartProductIds = cartProducts.map(item => item.id);
    // console.log('cartProductIds', cartProductIds)

    const isAlreadyInCart = cartProductIds.includes(productId);
    // console.log('isAlreadyInCart', isAlreadyInCart)

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product._id,
            name: product?.name,
            price: product?.price,
            discount: product?.discount,
            stock: product?.stock,
            quantity: 1,
            image: product?.image
        }));
        toast.success("Product added to Cart")
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading product.</div>;



    return (
        <SectionLayout>
            <div className="mx-auto space-y-6 py-20 px-8 lg:space-y-16 ">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(min-content,_400px)_1fr_280px]">
                    <div className="relative h-full w-full">
                        {/* <ProductSlider images={product.image} /> */}
                        <img src={product?.image} alt="Product Image" className="object-contain w-full h-full" />
                    </div>

                    <div className="mx-auto max-w-[420px] md:max-w-[520px] lg:max-w-none">
                        <div className="space-y-4 border-b border-[#E8ECEF] pb-6">
                            {/* <div className="flex items-center gap-2.5">
                                <div className="flex items-center gap-1">
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                    <StarIcon className="h-4 w-4" />
                                </div>

                                <span className="font-inter text-xs font-normal text-[#141718]">
                                    11 Reviews
                                </span>
                            </div> */}

                            <h1 className="font-poppins text-[40px] font-medium text-[#141718]">
                                {product?.name}
                            </h1>

                            <p className="font-inter text-base font-normal line-clamp-4 text-[#6C7275]">
                                {product?.description}
                            </p>

                            <p className="font-poppins text-[28px] font-medium text-[#141718]">
                                {product?.discount && product.discount > 0 ? (
                                    <>
                                        <span className="align-middle">
                                            {formatCurrency(product.price - (product.price * product.discount) / 100)}
                                        </span>
                                        <span className="ml-3 align-middle text-xl text-[#6C7275] line-through decoration-2">
                                            {formatCurrency(product.price)}
                                        </span>
                                        <span className="text-red-600 lg:text-[15px] md:text-sm text-[13px] ml-2">
                                            ({product?.discount} % off)
                                        </span>
                                    </>
                                ) : (
                                    <span className="align-middle">
                                        {formatCurrency(product?.price)}
                                    </span>
                                )}
                            </p>

                        </div>



                        <div className="space-y-4 border-b border-[#E8ECEF] py-6 lg:hidden">
                            <div className="flex h-10 gap-2 lg:h-[52px]">

                                <Button
                                    variant="ghost"
                                    onClick={() => { }}
                                    width="full"
                                    className="flex h-full items-center justify-center gap-2 rounded border border-[#141718]"
                                >
                                    <WishlistIcon
                                        stroke="#141718"
                                        className="h-4 w-4 lg:h-6 lg:w-6"
                                    />
                                    <span className="font-inter text-sm font-medium text-[#141718] lg:text-base">
                                        Wishlist
                                    </span>
                                </Button>
                            </div>

                            {/* <Button
                                width="full"
                                fontSize="sm"
                                className="h-10 rounded lg:h-[52px] lg:text-base"
                            >
                                Add to Cart
                            </Button> */}

                            <Button
                                className={`w-full ${isAlreadyInCart ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
                                disabled={isAlreadyInCart}
                                onClick={handleAddToCart}
                            >
                                {isAlreadyInCart ? "Added to cart" : "Add to Cart"}
                            </Button>
                        </div>

                        <div className="space-y-2 pt-6">
                            <div className="grid grid-cols-[100px_1fr] font-inter text-xs lg:grid-cols-[140px_1fr] lg:text-sm">
                                {/* <span className="text-[#6C7275]">SKU</span> */}
                                {/* <span className="text-[#141718]">1117</span> */}
                            </div>
                            <div className="grid grid-cols-[100px_1fr] font-inter text-xs lg:grid-cols-[140px_1fr] lg:text-sm">
                                <span className="text-[#6C7275]">CATEGORY</span>
                                <span className="text-[#141718]">
                                    <span
                                        className="after:ml-0.5 after:mr-1 after:content-[','] last:after:mx-0 last:after:content-['']"
                                    >
                                        {product?.category?.name}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-fit flex-col gap-8 rounded border border-[#E8ECEF] p-4 lg:flex">
                        <div className="space-y-2">
                            <p className="font-poppins font-semibold text-[#141718]">
                                Set quantity
                            </p>
                            <div className="flex items-end justify-between">
                                <p className="font-inter text-sm text-[#6C7275]">Subtotal</p>
                                <div className="space-y-1 text-right">
                                    <p className="font-inter text-sm text-[#6C7275] line-through">
                                        $400.00
                                    </p>
                                    <p className="font-poppins text-xl font-semibold text-[#141718]">
                                        $199.00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {/* <div className="flex h-10 items-center justify-between rounded bg-[#F5F5F5] px-2 lg:px-4">
                                <MinusIcon stroke="#141718" className="h-4 w-4 lg:h-5 lg:w-6" />
                                <span className="font-inter text-sm font-semibold text-[#141718]">
                                    1
                                </span>
                                <PlusIcon stroke="#141718" className="h-4 w-4 lg:h-5 lg:w-6" />
                            </div> */}
                            <Button
                                variant="ghost"
                                width="full"
                                onClick={() => { }}

                                className="flex h-10 items-center justify-center gap-2 rounded border border-[#141718]"
                            >
                                <WishlistIcon stroke="#141718" className="h-4 w-4" />
                                <span className="font-inter text-sm font-medium text-[#141718]">
                                    Wishlist
                                </span>
                            </Button>
                            <Button
                                className={`w-full ${isAlreadyInCart ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
                                disabled={isAlreadyInCart}
                                onClick={handleAddToCart}
                            >
                                {isAlreadyInCart ? "Added to cart" : "Add to Cart"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* <ProductTab tabs={product.tabs} /> */}
                {/* <ProductRecommendation /> */}
            </div>
        </SectionLayout>
    );
}
export default ProductDetail;