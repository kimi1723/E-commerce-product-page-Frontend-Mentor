import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalQuantity: 0,
	products: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart(state, action) {
			const existingProduct = state.products.find(product => product.id === action.payload.id);

			state.totalQuantity += action.payload.quantity;

			if (existingProduct) {
				existingProduct.quantity += action.payload.quantity;
			} else {
				state.products.push(action.payload);
			}
		},
		replaceCart(state, action) {
			state.products = action.payload.products;
			state.totalQuantity = action.payload.totalQuantity;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
