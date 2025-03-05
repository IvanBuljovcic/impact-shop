"use client";
import { useAppDispatch, useAppSelector, RootState } from "@/store";
import { fetchProducts, getAllCategories } from "@/store/slices/product-slice";
import { toReadableURI } from "@/utils/to-readable-uri";
import Link from "next/link";
import { useEffect } from "react";

const CategorieGrid = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.products);
  const categories = useAppSelector(getAllCategories);

  useEffect(() => {
    if (products.status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.status]);

  return (
    <div>
      {categories?.length &&
        categories.map((cat) => (
          <Link href={`category/${cat}`} key={cat} className="mr-4">
            {toReadableURI(cat)}
          </Link>
        ))}
    </div>
  );
};

export default CategorieGrid;
