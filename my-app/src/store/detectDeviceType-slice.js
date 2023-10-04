import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isMobile: window.innerWidth < 768 ? true : false,
};

const detectDeviceType = createSlice({
	name: 'deviceType',
	initialState,
	reducers: {
		detectDeviceType(state, action) {
			state.isMobile = action.payload;
		},
	},
});

export const detectDeviceTypeActions = detectDeviceType.actions;

export default detectDeviceType.reducer;
