"use client";

import React from "react";
import ProductCard from "./product-card";
import { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => (
  <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
    {products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductGrid;
