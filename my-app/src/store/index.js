import { configureStore } from '@reduxjs/toolkit';
import detectDeviceTypeReducer from './detectDeviceType-slice';
import cartReducer from './cart-slice';

const store = configureStore({
	reducer: {
		deviceType: detectDeviceTypeReducer,
		cart: cartReducer,
	},
});

export default store;
