import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  allCartProducts: [],
};

const cartProductsSlice = createSlice({
  name: "cartproducts",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.allCartProducts = action.payload;
    },
  },
});

export const { setCartProducts } = cartProductsSlice.actions;
export default cartProductsSlice.reducer;
