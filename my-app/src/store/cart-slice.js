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
			console.log(action);
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
