"use client";

import { useAppSelector } from "@/store";
import { getProductsByCategory } from "@/store/slices/product-slice";
import ProductGrid from "../Product/product-grid";

type CategoryProductsProps = {
  category: string;
};

const CategoryProducts = ({ category }: CategoryProductsProps) => {
  const products = useAppSelector((state) => getProductsByCategory(state, category));

  if (!products.length) {
    return <h2>No products found.</h2>;
  }

  return (
    <div className="flex flex-col items-center md:items-start">
      <h2>Showing <b>{products.length}</b> products</h2>
      <ProductGrid products={products} />
    </div>
  )
};

export default CategoryProducts;
