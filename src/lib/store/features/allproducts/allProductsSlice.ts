import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductData {}

const initialState: any = [];

const allProductsSlice = createSlice({
  name: "allproducts",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts } = allProductsSlice.actions;
export default allProductsSlice.reducer;
