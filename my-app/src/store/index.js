import { configureStore } from '@reduxjs/toolkit';
import detectDeviceTypeReducer from './detectDeviceType-slice';
import cartReducer from './cart-slice';
import errorReducer from './error-slice';
import loadingReducer from './loading-slice';
import authenticationReducer from './authentication-slice';
import userReducer from './userData-slice';

const store = configureStore({
	reducer: {
		deviceType: detectDeviceTypeReducer,
		cart: cartReducer,
		error: errorReducer,
		loading: loadingReducer,
		authentication: authenticationReducer,
		userData: userReducer,
	},
});

export default store;
