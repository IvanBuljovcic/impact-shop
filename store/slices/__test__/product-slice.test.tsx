import { describe, expect, beforeEach, vi, test, afterEach } from "vitest";
import productReducer, {
  fetchProducts,
  getAllCategories,
  getProductById,
  getProductByName,
  getProductsByCategory,
} from "../product-slice";
import { configureStore } from "@reduxjs/toolkit";
import { getAllProducts } from "@/api/product";
import { AppDispatch, RootState } from "@/store";

type MockFetchResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

type TestState = {
  products: ReturnType<typeof productReducer>;
};

// Mock the API response
vi.mock("@/api/product", () => ({
  getAllProducts: vi.fn(),
}));

const mockProducts = [
  { id: 1, title: "Product 1", category: "Category A" },
  { id: 2, title: "Product 2", category: "Category B" },
];

const mockState: RootState["products"] = {
  items: [
    {
      id: 1,
      title: "iPhone",
      category: "Electronics",
      price: 12,
      rating: { count: 43, rate: 4.5 },
      description: "",
      image: "",
    },
    {
      id: 2,
      title: "MacBook",
      category: "Electronics",
      price: 12,
      rating: { count: 43, rate: 4.5 },
      description: "",
      image: "",
    },
    {
      id: 3,
      title: "Coffee Mug",
      category: "Kitchen",
      price: 12,
      rating: { count: 43, rate: 4.5 },
      description: "",
      image: "",
    },
    {
      id: 4,
      title: "Watch",
      category: "Accessories",
      price: 12,
      rating: { count: 43, rate: 4.5 },
      description: "",
      image: "",
    },
  ],
  status: "success",
  error: null,
};

describe("Produt slice", () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: { products: productReducer },
    });
    dispatch = store.dispatch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Extra reducers", () => {
    test("should handle fetchProducts.pending", async () => {
      const pendingPromise = new Promise<Response>(() => {});

      vi.mocked(getAllProducts).mockReturnValue(pendingPromise);

      dispatch(fetchProducts());

      const state = store.getState() as TestState;

      expect(state.products.status).toBe("loading");
      expect(state.products.error).toBeNull();
    });

    test("should handle fetchProducts.fulfilled", async () => {
      const mockResponse: MockFetchResponse = {
        ok: true,
        json: () => Promise.resolve(mockProducts),
      };

      vi.mocked(getAllProducts).mockResolvedValue(mockResponse as unknown as Response);

      await dispatch(fetchProducts());

      const state = store.getState() as TestState;

      expect(state.products.status).toBe("success");
      expect(state.products.items).toEqual(mockProducts);
      expect(state.products.error).toBeNull();
    });

    // API error RETURN
    test("should handle fetchProducts.rejected when API returns error status", async () => {
      const mockResponse: MockFetchResponse = {
        ok: false,
        json: () => Promise.resolve({}),
      };

      vi.mocked(getAllProducts).mockResolvedValue(mockResponse as unknown as Response);

      await dispatch(fetchProducts());

      const state = store.getState() as TestState;

      expect(state.products.error).toBe("Failed to fetch data");
      expect(state.products.status).toBe("error");
      expect(state.products.items).toEqual([]);
    });

    // API error THROW
    test("should handle fetchProducts.rejected when API throws an error", async () => {
      // Create a network error with a specific message
      const networkError = new Error("Network error");
      vi.mocked(getAllProducts).mockRejectedValue(networkError);

      // Dispatch the action
      await dispatch(fetchProducts());

      // With our improved slice implementation, we can now expect the exact error message
      const state = store.getState() as TestState;

      expect(state.products.status).toBe("error");
      expect(state.products.error).toBe("Network error");
      expect(state.products.items).toEqual([]);
    });
  });

  describe("Selectors", () => {
    beforeEach(() => {
      store.dispatch({
        type: fetchProducts.fulfilled.type,
        payload: mockState.items,
      });
    });

    test("should select all unique categories", () => {
      const categories = getAllCategories(store.getState() as RootState);
      expect(categories).toEqual(["Electronics", "Kitchen", "Accessories"]);
      expect(categories.length).toBe(3);
    });

    test("should filter products by category", () => {
      const products = getProductsByCategory(store.getState() as RootState, "Electronics");

      expect(products.length).toBe(2);
      expect(products).toEqual([mockState.items[0], mockState.items[1]]);
    });

    test("should filter product by id", () => {
      const product = getProductById(store.getState() as RootState, 3);

      expect(product).toBeDefined();
      expect(product?.title).toBe("Coffee Mug");

      const noSuchProduct = getProductById(store.getState() as RootState, 999);
      expect(noSuchProduct).toBeUndefined();
    });

    test("should find product by query", () => {
      const searchResults = getProductByName(store.getState() as RootState, "Mug");
      expect(searchResults.length).toBe(1);

      // Multiple products
      const multipleResults = getProductByName(store.getState() as RootState, "M");
      expect(multipleResults.length).toBe(2);

      // Empty query
      const emptyQueryResults = getProductByName(store.getState() as RootState, "");
      expect(emptyQueryResults.length).toBe(4);
    });
  });
});
