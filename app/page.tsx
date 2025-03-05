"use client";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts, getAllCategories } from "@/store/slices/product-slice";
import { toReadableURI } from "@/utils/to-readable-uri";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.status]);

  const categories = useAppSelector(getAllCategories);

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
}

