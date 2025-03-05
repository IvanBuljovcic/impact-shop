import { toReadableURI } from "@/utils/to-readable-uri";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  return (
    <div>
      <h1>Category {toReadableURI(slug)}</h1>
    </div>
  );
};

export default CategoryPage;
