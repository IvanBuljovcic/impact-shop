import CategoryGrid from "@/components/Category/category-grid";
import Products from "@/components/Product/products";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start">
      <CategoryGrid />
      <Products />
    </div>
  );
}
