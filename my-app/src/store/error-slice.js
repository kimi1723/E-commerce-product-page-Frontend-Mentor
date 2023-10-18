import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isError: true,
	message: '',
};

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError(state, action) {
			state.isError = true;
			state.message = action.payload.message;
		},
		removeError(state, action) {},
	},
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
