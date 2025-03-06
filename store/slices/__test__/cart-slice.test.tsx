import { Product } from "@/types/product";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, test, beforeEach } from "vitest";
import {
  addItem,
  changeItemQuantity,
  getCartItems,
  getCartTotalItemCount,
  getCartTotalPrice,
  removeItem,
} from "../cart-slice";
import cartReducer from "../cart-slice";
import { Provider, useSelector } from "react-redux";
import { renderHook } from "@testing-library/react";

type TestState = {
  cart: ReturnType<typeof cartReducer>;
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 10,
    description: "Prod 1 Description",
    category: "cat 1",
    image: "",
    rating: { rate: 2.4, count: 100 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    description: "Prod 2 Description",
    category: "cat 2",
    image: "",
    rating: { rate: 5, count: 1 },
  },
  {
    id: 3,
    title: "Product 3",
    price: 30,
    description: "Prod 3 Description",
    category: "cat 3",
    image: "",
    rating: { rate: 3.6, count: 542 },
  },
];

describe("Cart slice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { cart: cartReducer },
    });
  });

  describe("Reducer actions", () => {
    test("should add a new item to the cart", () => {
      store.dispatch(addItem(mockProducts[0]));

      const state = store.getState() as TestState;

      expect(state.cart.items.length).toBe(1);
      expect(state.cart.items[0].product).toEqual(mockProducts[0]);
      expect(state.cart.items[0].quantity).toBe(1);
    });

    test("should increment quantity when adding the same item", () => {
      store.dispatch(addItem(mockProducts[0]));
      store.dispatch(addItem(mockProducts[0]));

      const state = store.getState() as TestState;

      expect(state.cart.items.length).toBe(1);
      expect(state.cart.items[0].product).toEqual(mockProducts[0]);
      expect(state.cart.items[0].quantity).toBe(2);
    });

    test("should remove an item from the cart", () => {
      store.dispatch(addItem(mockProducts[0]));
      store.dispatch(addItem(mockProducts[1]));

      const state = store.getState() as TestState;

      // Should have 2 items in cart
      expect(state.cart.items.length).toBe(2);
      expect(state.cart.items[0].product).toEqual(mockProducts[0]);
      expect(state.cart.items[0].quantity).toBe(1);
      expect(state.cart.items[1].product).toEqual(mockProducts[1]);
      expect(state.cart.items[1].quantity).toBe(1);

      store.dispatch(removeItem(mockProducts[0]));

      const updatedState = store.getState() as TestState;

      // Should have 1 item in cart
      expect(updatedState.cart.items.length).toBe(1);
      expect(updatedState.cart.items[0].product).toEqual(mockProducts[1]);
      expect(updatedState.cart.items[0].quantity).toBe(1);
    });

    test("should update quantity of an existing item", () => {
      store.dispatch(addItem(mockProducts[0]));

      const state = store.getState() as TestState;
      expect(state.cart.items[0].quantity).toBe(1);

      store.dispatch(changeItemQuantity({ product: mockProducts[0], quantity: 11 }));

      const updatedState = store.getState() as TestState;
      expect(updatedState.cart.items[0].quantity).toBe(11);
    });

    test("should remove item if quantity is set to 0 (zero)", () => {
      store.dispatch(addItem(mockProducts[0]));
      store.dispatch(addItem(mockProducts[1]));
      store.dispatch(changeItemQuantity({ product: mockProducts[0], quantity: 0 }));

      const state = store.getState() as TestState;

      expect(state.cart.items.length).toBe(1);
      expect(state.cart.items[0].product).toEqual(mockProducts[1]);
    });
  });

  describe("Selectors", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;

    test("should select all cart items", () => {
      store.dispatch(addItem(mockProducts[0]));
      store.dispatch(addItem(mockProducts[1]));

      const { result } = renderHook(() => useSelector(getCartItems), { wrapper });

      expect(result.current.length).toBe(2);
      expect(result.current[0].product).toEqual(mockProducts[0]);
      expect(result.current[1].product).toEqual(mockProducts[1]);
    });

    test("should calculate total price correctly", () => {
      store.dispatch(addItem(mockProducts[0])); // 1 * 10
      store.dispatch(addItem(mockProducts[0])); // 2 * 10
      store.dispatch(addItem(mockProducts[2])); // 1 * 30

      const { result } = renderHook(() => useSelector(getCartTotalPrice), { wrapper });
      expect(result.current).toBe(50);
    });

    test("should return 0 for total price if cart is empty", () => {
      const { result } = renderHook(() => useSelector(getCartTotalPrice), { wrapper });
      expect(result.current).toBe(0);
    });

    test("should return 0 for total count if cart is empty", () => {
      const { result } = renderHook(() => useSelector(getCartTotalItemCount), { wrapper });
      expect(result.current).toBe(0);
    });
  });

  describe("Complex scenario", () => {
    test("should handle a sequence of cart opperations correctly", () => {
      // Add products
      store.dispatch(addItem(mockProducts[0]));
      store.dispatch(addItem(mockProducts[1]));
      store.dispatch(addItem(mockProducts[0]));

      let state = store.getState() as TestState;

      expect(state.cart.items.length).toBe(2);
      expect(state.cart.items[0].quantity).toBe(2);

      // Change item quantity
      store.dispatch(changeItemQuantity({ product: mockProducts[0], quantity: 11 }));

      state = store.getState() as TestState;

      expect(state.cart.items[0].quantity).toBe(11);

      // Add item
      store.dispatch(addItem(mockProducts[2]));

      state = store.getState() as TestState;
      expect(state.cart.items.length).toBe(3);

      // Remove item
      store.dispatch(removeItem(mockProducts[0]));

      state = store.getState() as TestState;
      expect(state.cart.items.length).toBe(2);
      expect(state.cart.items[0].product).toEqual(mockProducts[1]);
      expect(state.cart.items[0].quantity).toBe(1);
      expect(state.cart.items[1].product).toEqual(mockProducts[2]);
      expect(state.cart.items[1].quantity).toBe(1);
    });
  });
});
