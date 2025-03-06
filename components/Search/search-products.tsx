"use client";

import { useAppSelector } from "@/store";
import { getProductByName } from "@/store/slices/product-slice";
import ProductGrid from "../Product/product-grid";

type SearchProductsProps = {
  query: string;
};

const SearchProducts = ({ query }: SearchProductsProps) => {
  const products = useAppSelector((state) => getProductByName(state, query));

  if (!products.length) {
    return <h2>No products found.</h2>;
  }

  return (
    <div>
      <h2>Showing <b>{products.length}</b> products</h2>
      <ProductGrid products={products} />
    </div>
  )
};

export default SearchProducts;
