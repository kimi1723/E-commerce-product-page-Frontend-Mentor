import { configureStore } from '@reduxjs/toolkit';
import detectDeviceTypeReducer from './detectDeviceType-slice';

const store = configureStore({
	reducer: {
		deviceType: detectDeviceTypeReducer,
	},
});

export default store;
