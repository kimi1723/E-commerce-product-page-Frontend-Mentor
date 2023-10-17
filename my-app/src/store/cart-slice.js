import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalQuantity: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart(state, action) {
			console.log(action.payload);
			state.items.push(action.payload);
			state.totalQuantity += action.payload.quantity;
		},
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.totalQuantity = action.payload.totalQuantity;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
