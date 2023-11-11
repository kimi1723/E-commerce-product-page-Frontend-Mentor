import { configureStore } from '@reduxjs/toolkit';
import detectDeviceTypeReducer from './detectDeviceType-slice';
import cartReducer from './cart-slice';
import errorReducer from './error-slice';
import loadingReducer from './loading-slice';
import isSignedInReducer from './authentication-slice';

const store = configureStore({
	reducer: {
		deviceType: detectDeviceTypeReducer,
		cart: cartReducer,
		error: errorReducer,
		loading: loadingReducer,
		isSignedIn: isSignedInReducer,
	},
});

export default store;
