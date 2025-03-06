"use client";
import { useAppSelector } from "@/store";
import { getProductById } from "@/store/slices/product-slice";
import ProductImage from "./product-image";
import RatingStars from "../rating-stars";
import ProductPrice from "./product-price";
import AddToCart from "../add-to-cart";
import Link from "next/link";

type ProductDetailsProps = {
  productId: number;
};

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const product = useAppSelector((state) => getProductById(state, productId));

  if (!product) {
    return <h2 className="text-primary text-2xl">Product not found</h2>;
  }

  return (
    <div className="flex flex-col gap-8 bg-white mx-auto p-8 w-full max-w-3/4">
      <header>
        <h1 className="text-primary text-4xl">{product.title}</h1>
      </header>

      <div className="gap-4 grid grid-cols-3">
        <div className="shadow-md">
          <ProductImage image={product.image} title={product.title} hasHover={false} />
        </div>

        <div className="flex flex-col col-span-2">
          <p className="text-lg">{product.description}</p>

          <div className="mt-auto">
            <ProductPrice price={product.price} currency="EUR" />
            <RatingStars rate={product.rating.rate} count={product.rating.count} />

            <div className="mt-2">
              <AddToCart product={product} />
            </div>
          </div>
        </div>

        <hr className="col-span-full my-4" />

        <div className="flex flex-row justify-start items-center gap-4">
          <h3 className="text-2xl">Categories:</h3>
          <Link
            className="hover:bg-secondary-foreground p-2 border text-xl transition-colors"
            href={`/category/${product.category}`}
          >
            {product.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
