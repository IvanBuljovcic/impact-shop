"use client";

import { Product } from "@/sanity.types";
import { useAppDispatch } from "@/store";
import { TrolleyIcon } from "@sanity/icons";
import { addItem } from "@/store/slices/cart-slice";

type ProductAddToCartProps = {
  product: Product;
};

const ProductAddToCart = ({ product }: ProductAddToCartProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="relative flex flex-1 sm:flex-none justify-center sm:justify-start items-center space-x-2 bg-button hover:opacity-50 px-4 py-2 rounded font-bold text-button-foreground transition-opacity"
      onClick={() => dispatch(addItem(product))}
    >
      <TrolleyIcon className="w-6 h-6" />
      Add to cart
    </button>
  );
};

export default ProductAddToCart;
