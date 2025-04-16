import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; // Extract plant details
        const existingItem = state.items.find(item => item.name === name);
        if(existingItem){
            existingItem.quantity++; // Increment quantity if item exists
        } else{
            state.items.push({ name, image, cost, quantity: 1}); // add new item
        }
    },
    removeItem: (state, action) => {
        // Remove an item from the cart by name
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemIndex = state.items.findIndex(item => item.name === name);
        if (itemIndex !== -1 && quantity > 0) {
          state.items[itemIndex].quantity = quantity; // Update quantity if valid
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
