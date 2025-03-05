import Link from "next/link";
import ProductImage from "./product-image";
import { Product } from "@/types/product";
import RatingStars from "../rating-stars";
import ProductPrice from "./product-price";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col bg-card shadow-sm hover:shadow-md p-4 border border-card-border rounded-lg h-full overflow-hidden text-card-foreground transition-all duration-200"
    >
      <div className="flex flex-col w-full h-full overflow-hidden">
        <header className="mb-4">
          <ProductImage image={product.image} title={product.title} />

          <h1 className="text-current text-2xl">{product.title}</h1>
        </header>

        <div className="mt-auto">
          {product.description && <p className="mt-2 text-current text-sm line-clamp-2">{product.description}</p>}

          <ProductPrice price={product.price} currency="EUR" />
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
