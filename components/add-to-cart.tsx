"use client";

import { useAppDispatch } from "@/store";
import { addItem, changeItemQuantity } from "@/store/slices/cart-slice";
import { Product } from "@/types/product";
import { useState } from "react";
import Button from "./button";

type AddToCartProps = {
  product: Product;
  showQuantity?: boolean;
  title?: string;
  isUpdate?: boolean;
  quantity?: number;
};

const AddToCart = ({ product, showQuantity = false, title, isUpdate = false, quantity = 1 }: AddToCartProps) => {
  const [_quantity, setQuantity] = useState(quantity ?? 1);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (input: number) => {
    if (Number.isNaN(input)) {
      return null;
    }

    if (input <= 0) {
      return null;
    }

    return setQuantity(input);
  };

  const handleDecrement = () => {
    if (_quantity > 0) {
      return setQuantity(_quantity - 1);
    }

    return;
  };

  const handleIncrement = () => setQuantity(_quantity + 1);

  return (
    <div className="flex flex-row gap-4">
      {showQuantity && (
        <div className="flex flex-row gap-2">
          <Button disabled={_quantity < 1} onClick={handleDecrement}>
            -
          </Button>
          <input
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            type="number"
            className="pl-2 border w-12"
            value={_quantity}
          />
          <Button onClick={handleIncrement}>+</Button>
        </div>
      )}
      {!isUpdate && <Button onClick={() => dispatch(addItem(product))}>{title ?? "Add to cart"}</Button>}
      {isUpdate && (
        <Button onClick={() => dispatch(changeItemQuantity({ product, quantity: _quantity }))}>
          {title ?? "Update quantity"}
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
