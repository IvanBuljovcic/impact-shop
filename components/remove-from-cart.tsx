"use client";

import { useAppDispatch } from "@/store";
import { removeItem } from "@/store/slices/cart-slice";
import { Product } from "@/types/product";

type RemoveFromCartProps = {
  product: Product;
};

const RemoveFromCart = ({ product }: RemoveFromCartProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(removeItem(product))}
      className="space-x-2 bg-red-700 disabled:bg-gray-500 hover:opacity-50 ml-auto px-4 py-2 rounded font-bold text-button-foreground transition-opacity cursor-pointer cursor-pointer disabled:cursor-not-allowed shrink-0"
    >
      Remove item from cart
    </button>
  );
};

export default RemoveFromCart;
