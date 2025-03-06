import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AddToCart from "../add-to-cart";
import { Product } from "@/types/product";
import { CartItem } from "@/store/slices/cart-slice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Mock Redux actions
const mockAddItem = vi.fn();
const mockChangeItemQuantity = vi.fn();

// Mock Redux store actions
vi.mock("@/store/slices/cart-slice", () => ({
  addItem: (product: Product) => {
    mockAddItem(product);
    return { type: "cart/addItem", payload: product };
  },
  changeItemQuantity: (payload: CartItem) => {
    mockChangeItemQuantity(payload);
    return { type: "cart/changeItemQuantity", payload };
  },
}));

// Mock useAppDispatch hook
const mockDispatch = vi.fn((action) => action);
vi.mock("@/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

const product: Product = {
  id: 1,
  title: "Product",
  category: "Category",
  description: "Description",
  image: "",
  price: 102,
  rating: {
    count: 31,
    rate: 3.5,
  },
};

// Helper function for rendering with Redux Provider
const renderWithProvider = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      cart: (state = { items: [] }) => state,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Add to cart", () => {
  test("renders only Add to cart button", () => {
    renderWithProvider(<AddToCart product={product} />);

    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });
});
