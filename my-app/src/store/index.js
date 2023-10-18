import { configureStore } from '@reduxjs/toolkit';
import detectDeviceTypeReducer from './detectDeviceType-slice';
import cartReducer from './cart-slice';
import errorReducer from './error-slice';

const store = configureStore({
	reducer: {
		deviceType: detectDeviceTypeReducer,
		cart: cartReducer,
		error: errorReducer,
	},
});

export default store;
