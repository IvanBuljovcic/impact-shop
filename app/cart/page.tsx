import CartView from "@/components/Cart/cart-view";
import PageTitle from "@/components/page-title";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <div className="flex flex-col justify-center gap-5 mx-auto mt-8 sm:px-4 w-full container">
      <PageTitle title="Cart" />

      <Suspense fallback={<div>Loading cart...</div>}>
        <CartView />
      </Suspense>
    </div>
  );
};

export default CartPage;
