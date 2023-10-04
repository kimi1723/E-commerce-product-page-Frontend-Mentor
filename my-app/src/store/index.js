import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

export const deviceTypeSlice = createSlice({
	name: 'deviceType',
	initialState: { isMobile: true },
	reducers: {
		detectDeviceType(state) {
			const detectDeviceHandler = () => {
				if (window.innerWidth > 768) {
					return { isMobile: false };
				} else {
					return { isMobile: true };
				}
			};

			window.addEventListener('resize', detectDeviceHandler);
		},
	},
});

const store = configureStore({
	reducer: {
		device: deviceTypeSlice.reducer,
	},
});

export default store;
