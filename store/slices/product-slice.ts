import { Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

type ProductState = {
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
  reducers: {},
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
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const getAllCategories = (state: { products: ProductState }) => [
  ...new Set(state.products.items.map((product) => product.category)),
];

export default productSlice.reducer;
