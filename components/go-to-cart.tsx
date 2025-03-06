"use client";
import { useAppSelector } from "@/store";
import { getCartTotalItemCount } from "@/store/slices/cart-slice";
import Link from "next/link";

const GoToCart = () => {
  const totalItems = useAppSelector(getCartTotalItemCount);

  return (
    <div className="flex sm:flex-none md:flex-1 items-center space-x-4 sm:mt-0" data-testid="app-header__cart">
      <Link
        href="/cart"
        className="relative flex flex-1 sm:flex-none justify-center sm:justify-start items-center space-x-2 bg-button hover:opacity-50 px-4 py-2 rounded font-bold text-button-foreground transition-opacity"
        data-testid="app-header__cart-link"
      >
        <span>Go to cart</span>
        <span className="-top-1 -right-1 absolute bg-orange-500 m-0 p-0.5 rounded-full font-mono text-white text-sm text-center leading-tight">
          {totalItems}
        </span>
      </Link>
    </div>
  );
};
export default GoToCart;
