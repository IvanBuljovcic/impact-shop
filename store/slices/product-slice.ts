import { getAllProducts } from "@/api/product";
import { Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export const fetchProducts = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllProducts();

    if (!response.ok) {
      return rejectWithValue("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
  }
});

export type ProductState = {
  items: Product[];
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
};

const initialState: ProductState = {
  items: [] as Product[],
  status: "idle",
  error: null as string | null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = (action.payload as string) || action.error.message || "An error occurred";
      });
  },
});

export const getAllCategories = (state: RootState) => [
  ...new Set(state.products.items.map((product) => product.category)),
];

export const getProductsByCategory = (state: RootState, category: string) => {
  return state.products.items.filter((product) => product.category === category);
};

export const getProductById = (state: RootState, productId: Product["id"]) => {
  return state.products.items.find((product) => product.id === productId);
};

export const getProductByName = (state: RootState, searchQuery: string) => {
  // If empty query, return all products
  if (!searchQuery.trim()) {
    return state.products.items;
  }

  const query = searchQuery.toLocaleLowerCase().trim();

  return state.products.items.filter((item) => item.title.toLocaleLowerCase().trim().includes(query));
};

export const { clearState } = productSlice.actions;
export default productSlice.reducer;
