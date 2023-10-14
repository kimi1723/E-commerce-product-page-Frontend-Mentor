import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalQuantity: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart(state, action) {},
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.totalQuantity = action.payload.totalQuantity;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
