import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],  
  },
  reducers: {
    // Add item to the cart with an initial quantity of 1 if it's a new addition
    addItem: (state, action) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      
      if (itemExists) {
        // If the item already exists, just increment the quantity
        itemExists.quantity += 1;
      } else {
        // If it's a new item, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove item from the cart by id
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Clear all items in the cart
    clearCart: (state) => {
      state.items = [];
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item && quantity > 0) { // Prevent setting a quantity less than 1
        item.quantity = quantity;
      }
    },
  },
});

// Export actions and reducer
export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
