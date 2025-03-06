import { Product } from "@/types/product";
import AddToCart from "../add-to-cart";
import ProductImage from "../Product/product-image";
import ProductPrice from "../Product/product-price";
import RatingStars from "../rating-stars";
import RemoveFromCart from "../remove-from-cart";

type CartCardProps = {
  product: Product;
  quantity: number;
  hideAddToCart?: boolean;
};

const CartCard = ({ product, quantity, hideAddToCart = false }: CartCardProps) => {
  return (
    <div className="group flex flex-col md:grid md:grid-cols-5 bg-card shadow-sm hover:shadow-md p-4 border border-card-border rounded-lg h-full overflow-hidden text-card-foreground transition-all duration-200">
      <h1 className="col-span-full text-current text-2xl">{product.title}</h1>
      <div className="col-span-1 mb-4">
        <ProductImage image={product.image} title={product.title} hasHover={false} />
      </div>

      <div className="flex flex-col justify-start col-span-4">
        {product.description && <p className="mt-2 text-current text-sm line-clamp-2">{product.description}</p>}

        <div className="mt-auto">
          <ProductPrice price={product.price} currency="EUR" />

          <RatingStars rate={product.rating.rate} count={product.rating.count} />

          <div className="flex md:flex-row flex-col gap-4 mt-4">
            {!hideAddToCart && (
              <AddToCart product={product} showQuantity={true} title="Update quantity" isUpdate quantity={quantity} />
            )}

            <RemoveFromCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
