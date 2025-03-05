import CategoryProducts from "@/components/Category/category-products";
import GoBack from "@/components/go-back";
import { toReadableURI } from "@/utils/to-readable-uri";
import { Suspense } from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  return (
    <div className="flex flex-col justify-center gap-5 mx-auto mt-8 w-full container">
      <GoBack />
      <h1 className="text-primary text-4xl text-center">{toReadableURI(slug)}</h1>

      <Suspense fallback={<div>Loading products...</div>}>
        <CategoryProducts category={decodeURI(slug)} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
