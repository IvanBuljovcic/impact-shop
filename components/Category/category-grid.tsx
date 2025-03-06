"use client";

import { useAppSelector } from "@/store";
import { getAllCategories } from "@/store/slices/product-slice";
import CategoryCard from "./category-card";

const CategoryGrid = () => {
  const categories = useAppSelector(getAllCategories);

  if (!categories?.length) {
    return (
      <div className="flex justify-center items-center gap-4 p-4">
        <h1>No categories to show</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-row md:flex-col flex-wrap justify-start items-start gap-4 p-4 w-full">
      {categories?.length && categories.map((cat) => <CategoryCard key={cat} categorie={cat} />)}
    </div>
  );
};

export default CategoryGrid;
