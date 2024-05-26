import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isMobile: window.innerWidth < 992 ? true : false,
};

const detectDeviceTypeSlice = createSlice({
	name: 'deviceType',
	initialState,
	reducers: {
		detectDeviceType(state, action) {
			state.isMobile = action.payload;
		},
	},
});

export const detectDeviceTypeActions = detectDeviceTypeSlice.actions;

export default detectDeviceTypeSlice.reducer;
