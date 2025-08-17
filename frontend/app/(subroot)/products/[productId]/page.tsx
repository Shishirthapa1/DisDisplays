import ProductDetail from "./ProductDetail";


export default function Page({ params }: { params: { productId: string } }) {
  return <ProductDetail productId={params.productId} />;
}