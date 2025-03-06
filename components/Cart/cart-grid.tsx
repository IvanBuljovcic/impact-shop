import CartCard from "./cart-card";
import { CartItem } from "@/store/slices/cart-slice";

type CartGridProps = {
  products: CartItem[];
};

const CartGrid = ({ products }: CartGridProps) => {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 px-4 lg:px-0">
      {products?.map((item) => (
        <CartCard key={item.product.id} product={item.product} quantity={item.quantity} />
      ))}
    </div>
  );
};
export default CartGrid;
