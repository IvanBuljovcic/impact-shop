import CategoryProducts from "@/components/Category/category-products";
import PageTitle from "@/components/page-title";
import { toReadableURI } from "@/utils/to-readable-uri";
import { Suspense } from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  return (
    <div className="flex flex-col justify-center gap-5 mx-auto mt-8 sm:px-4 w-full container">
      <PageTitle title={toReadableURI(slug)} />

      <Suspense fallback={<div>Loading products...</div>}>
        <CategoryProducts category={decodeURI(slug)} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
