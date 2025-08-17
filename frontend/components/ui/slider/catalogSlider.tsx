"use client";

// package
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

// ui
// import ProductCard from "@/ui/card/ProductCardNew";
import * as ProductCard from "@/ui/card/productCard";
// data
// import products from "@/data/product.json";

// css
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/redux/api/rest/query/queryApi";

export default function CatalogSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      spacing: 8,
      perView: 2,
    },
    mode: "snap",
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
        mode: "free-snap",
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 16,
        },
        mode: "free-snap",
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 5,
          spacing: 16,
        },
        mode: "free-snap",
      },
    },
    renderMode: "performance",
  });

  const products = data?.products || [];

  const newProducts = products.filter((product: any) => product?.productType === "new-arrival");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="relative">
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <div ref={slideRef} className="keen-slider">
        {/* {products.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))} */}
        {newProducts.map((product: any) => (
          <div key={product._id} className="keen-slider__slide">
            <ProductCard.Root data={product}>
              <ProductCard.Thumbnail>
                <ProductCard.ThumbnailBadge>
                  <ProductCard.Badge>new</ProductCard.Badge>
                  <ProductCard.WishlistButton />
                </ProductCard.ThumbnailBadge>

                <Link href={`/products/${product._id}`}>
                  <ProductCard.Image />
                </Link>
              </ProductCard.Thumbnail>

              <Link href={`/products/${product._id}`}>
                <ProductCard.Content>
                  <ProductCard.Name />
                  <ProductCard.Category />
                  <ProductCard.Price />
                  <ProductCard.Description />
                </ProductCard.Content>
              </Link>
            </ProductCard.Root>
          </div>
        ))}

      </div>
    </div>
  );
}
