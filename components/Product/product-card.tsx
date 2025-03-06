import Link from "next/link";
import ProductImage from "./product-image";
import { Product } from "@/types/product";
import RatingStars from "../rating-stars";
import ProductPrice from "./product-price";
import AddToCart from "../add-to-cart";

type ProductCardProps = {
  product: Product;
  hideAddToCart?: boolean;
};

const ProductCard = ({ product, hideAddToCart = false }: ProductCardProps) => {
  return (
    <div className="group flex flex-col bg-card shadow-sm hover:shadow-md p-4 border border-card-border rounded-lg h-full overflow-hidden text-card-foreground transition-all duration-200">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <header className="mb-4">
          <Link href={`/product/${product.id}`}>
            <ProductImage image={product.image} title={product.title} />

            <h1 className="text-current text-2xl">{product.title}</h1>
          </Link>
        </header>

        <div className="mt-auto">
          {product.description && <p className="mt-2 text-current text-sm line-clamp-2">{product.description}</p>}

          <ProductPrice price={product.price} currency="EUR" />
          <RatingStars rate={product.rating.rate} count={product.rating.count} />

          <div className="mt-4">{!hideAddToCart && <AddToCart product={product} />}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
