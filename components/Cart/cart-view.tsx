"use client"

import { useAppSelector } from "@/store";
import { getCartItems } from "@/store/slices/cart-slice";
import ProductGrid from "../Product/product-grid";

const CartView = () => {
  const cartItems = useAppSelector(getCartItems);

  const mappedToProducts = cartItems.map((item) => item.product);
  
  return (
    <div>
      <h1>Cart</h1>
      <ProductGrid products={mappedToProducts} />
    </div>
  )
}

export default CartView;