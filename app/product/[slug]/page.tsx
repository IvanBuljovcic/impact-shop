import GoBack from "@/components/go-back";
import ProductDetails from "@/components/Product/product-details";
import { Suspense } from "react";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  return (
    <div className="flex flex-col justify-center gap-5 mx-auto mt-8 mb-8 md:px-4 w-full container">
      <div className="ml-4">
        <GoBack />
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductDetails productId={parseInt(slug)} />
      </Suspense>
    </div>
  );
};
export default ProductPage;
