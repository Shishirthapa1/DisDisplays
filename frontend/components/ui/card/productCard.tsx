"use client";

// package
import React from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import { VariantProps, cva } from "class-variance-authority";

// ui
import ButtonPrimitive, { ButtonProps } from "@/ui/button";
import Text, { TextProps } from "@/ui/text";
import { StarIcon, WishlistIcon } from "@/ui/assets/svg";

// lib
import { cn, formatCurrency, formatRating } from "@/lib/utils";

// hooks
import {
  ProductCardProvider,
  useProductCardContext,
} from "@/hooks/productCardContext";

export type ProductDataProps = {
  data: {
    _id: string;
    image: string;
    stock?: number;
    productType?: string;
    name: string;
    price: number;
    discount?: number;
    description?: string;
    category?: {
      _id: string;
      name: string;
    };
  };
};


interface RootProps
  extends React.HTMLAttributes<HTMLDivElement>,
  ProductDataProps { }

const Root: React.FC<RootProps> = ({ data, className, children, ...props }) => {
  return (
    <ProductCardProvider data={data}>
      <div className={cn("grid grid-cols-1 gap-3", className)} {...props}>
        {children}
      </div>
    </ProductCardProvider>
  );
};

type ThumbnailProps = React.PropsWithChildren<{ className?: string }>;

const Thumbnail: React.FC<ThumbnailProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "group relative flex h-[308px] w-full flex-col justify-between overflow-hidden bg-[#F3F5F7] p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

const ThumbnailBadge: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="z-10 flex items-start justify-between">{children}</div>
  );
};

type BadgeVariants = VariantProps<typeof badgeVariants>;

const badgeVariants = cva(
  "w-fit rounded px-3.5 py-1 font-inter lg:text-sm md:text-xs text-[10px] font-bold uppercase",
  {
    variants: {
      intent: {
        default: "bg-white text-black",
        discount: "bg-[#38CB89] text-[#FEFEFE]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

type CategoryProps = Omit<TextProps, "children">;

const Category: React.FC<CategoryProps> = ({ className, ...props }) => {
  const { category } = useProductCardContext();

  return (
    <Text
      size="xs"
      weight={500}
      color="gray"
      className={cn("line-clamp-1 italic", className)}
      {...props}
    >
      {category?.name || "N/A"}
    </Text>
  );
};


interface BadgeProps
  extends BadgeVariants,
  React.HTMLAttributes<HTMLDivElement> { }

const Badge: React.FC<BadgeProps> = ({
  intent,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ intent, className }))} {...props}>
      {children}
    </div>
  );
};

type WishlistButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const WishlistButton: React.FC<WishlistButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "shadow-[rgba(15, 15, 15, 0.12)] flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity duration-100 ease-out group-hover:opacity-100",
        className,
      )}
      {...props}
    >
      <WishlistIcon className="h-5 w-5" />
    </button>
  );
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonPrimitive {...props}>{children}</ButtonPrimitive>;
};

type ImageProps = Omit<NextImageProps, "src" | "alt">;

const Image: React.FC<ImageProps> = ({
  width = 231,
  height = 308,
  className,
  ...props
}) => {
  const { image, name } = useProductCardContext();
  console.log("Image type:", typeof image, image);

  return (
    <NextImage
      src={image}
      width={width}
      height={height}
      alt={name || "Product Image"}
      className={cn(
        "absolute left-0 top-0 z-0 h-full w-full object-cover",
        className,
      )}
      {...props}
    />


  );
};

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
};

type RatingsProps = {
  className?: string;
};



type NameProps = Omit<TextProps, "children">;

const Name: React.FC<NameProps> = ({ className, ...props }) => {
  const { name } = useProductCardContext();

  return (
    <Text
      weight={600}
      color="black/800"
      className={cn("line-clamp-1 lg:text-base md:text-sm text-xs", className)}
      {...props}
    >
      {name}
    </Text>
  );
};

type PriceProps = Omit<TextProps, "children">;

const Price: React.FC<PriceProps> = ({ className, ...props }) => {
  const { price, discount } = useProductCardContext();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Text
        size="sm"
        weight={600}
        color="black/800"
        className="line-clamp-1 lg:text-sm text-xs text-[10px]"
        {...props}
      >
        {formatCurrency(price)}
      </Text>

      {typeof discount === 'number' && discount > 0 && (
        <Text size="xs" weight={500} color="red" className="uppercase lg:text-xs md:text-[10px] text-[8px]">
          {discount}% off
        </Text>
      )}

    </div>
  );
};


type DescriptionProps = Omit<TextProps, "children">;

const Description: React.FC<DescriptionProps> = ({ className, ...props }) => {
  const { description } = useProductCardContext();

  return (
    <Text
      size="xs"
      weight={400}
      color="gray"
      className={cn("overflow-hidden lg:text-xs md:text-[10px] text-[8px] line-clamp-3", className)}
      {...props}
    >
      {description}
    </Text>
  );
};

export {
  Root,
  Thumbnail,
  ThumbnailBadge,
  Badge,
  WishlistButton,
  Image,
  Button,
  Content,
  Name,
  Price,
  Description,
  Category
};
