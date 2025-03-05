"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { getProductById } from "@/store/slices/product-slice";
import ProductImage from "./product-image";
import RatingStars from "../rating-stars";
import ProductPrice from "./product-price";
import { addItem } from "@/store/slices/cart-slice";

type ProductDetailsProps = {
  productId: number;
};

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const product = useAppSelector((state) => getProductById(state, productId));
  const dispatch = useAppDispatch();

  if (!product) {
    return <h2 className="text-primary text-2xl">Product not found</h2>;
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-primary text-4xl">{product.title}</h1>
      </header>

      <div className="grid grid-cols-3">
        <ProductImage image={product.image} title={product.title} />

        <div className="col-span-2">
          <p className="text-lg">{product.description}</p>
          <ProductPrice price={product.price} currency="EUR" />
          <RatingStars rate={product.rating.rate} count={product.rating.count} />

          <button onClick={() => dispatch(addItem(product))} className="mt-4 p-4 border cursor-pointer">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
