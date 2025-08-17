export type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  discount: number;
  description: string;
  image?: string;
  productType?: string;
  category: {
    _id: string;
    name: string;
  };
};

// export type ProductTabs = {
//   additionalInfo: ProductAdditionalInfo;
//   reviews: ProductReviews;
// };

// export type ProductAdditionalInfo = {
//   details: ProductDetails;
//   specifications: ProductSpecifications;
// };

// type ProductDetails = string[];

// type ProductSpecifications = {
//   label: string;
//   items: { label: string; value: string }[];
// }[];

// export type ProductReviews = {
//   id: number;
//   profile: {
//     image: {
//       src: string;
//       alt: string;
//     };
//     name: string;
//   };
//   rating: number;
//   comment: string;
// }[];
