import CategoryGrid from "@/components/Category/category-grid";
import Products from "@/components/Product/products";

export default function Home() {
  return (
    <div className="items-start grid grid-cols-1 md:grid-cols-8">
      <aside className="col-span-2">
        <CategoryGrid />
      </aside>
      <div className="col-span-6">
        <Products />
      </div>
    </div>
  );
}
