import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isError: false,
	message: '',
};

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError(state, action) {
			state.isError = action.payload.isError;
			state.message = action.payload.message;
		},
	},
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
