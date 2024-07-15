// store/rootReducer.ts
import { combineReducers } from "redux";
import exampleReducer from "./features/example/exampleSlice";
import allProductsSlice from "./features/allproducts/allProductsSlice";
import cartProductsSlice from "./features/cartproducts/cartProductsSlice";

const rootReducer = combineReducers({
  example: exampleReducer,
  allproducts: allProductsSlice,
  cartproducts: cartProductsSlice,
});

export default rootReducer;
