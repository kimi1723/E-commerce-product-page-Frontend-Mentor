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
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
