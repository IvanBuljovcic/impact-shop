"use client";

import { useAppSelector } from "@/store";
import { getCartItems, getCartTotalPrice } from "@/store/slices/cart-slice";
import CartGrid from "./cart-grid";

const CartView = () => {
  const cartItems = useAppSelector(getCartItems);
  const cartTotalPrice = useAppSelector(getCartTotalPrice);

  return (
    <div className="flex mb-8">
      {!cartItems.length && <h2 className="text-primary text-xl">Cart is empty</h2>}

      <div className="flex flex-col gap-4 md:grid md:grid-cols-8">
        <div className="col-span-6">
          <CartGrid products={cartItems} />
        </div>

        {!!cartItems?.length && (
          <div className="flex flex-col col-span-2 mb-8">
            <div className="bg-secondary-foreground shadow-lg px-8 py-4">
              <h2 className="mb-4 font-bold text-xl underline underline-offset-4">Cart summary</h2>
              {cartItems.map((item) => (
                <div key={item.product.id} className="gap-2 grid grid-cols-3 mb-2 pb-2 border-b-1">
                  <span className="col-span-2 font-bold">{item.product.title}:</span>
                  <span>{item.product.price * item.quantity} EUR</span>
                </div>
              ))}
              <h3 className="mt-5 font-bold text-primary-foreground text-lg">Total price: {cartTotalPrice.toFixed(2)} EUR</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
