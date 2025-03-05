"use client";

import { useAppSelector } from "@/store";
import { makeSelectProductsByCategory } from "@/store/slices/product-slice";
import { useMemo } from "react";
import ProductGrid from "../Product/product-grid";

type CategoryProductsProps = {
  category: string;
};

const CategoryProducts = ({ category }: CategoryProductsProps) => {
  const selectProductsByCategory = useMemo(() => makeSelectProductsByCategory(), []);
  const products = useAppSelector((state) => selectProductsByCategory(state, category));

  if (!products.length) {
    return <h2>No products found.</h2>;
  }

  return <ProductGrid products={products} />;
};

export default CategoryProducts;
