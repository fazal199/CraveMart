// store/rootReducer.ts
import { combineReducers } from 'redux';
import exampleReducer from './features/example/exampleSlice';
import allProductsSlice from './features/allproducts/allProductsSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
  allproducts : allProductsSlice,
});

export default rootReducer;
