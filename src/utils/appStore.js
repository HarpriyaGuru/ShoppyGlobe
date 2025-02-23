import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';  

const appStore = configureStore({
  reducer: {
    cart: cartReducer,  // Add cartReducer to the store under the "cart" key
  },
});

export default appStore;
