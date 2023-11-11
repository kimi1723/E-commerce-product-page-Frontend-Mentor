import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignedIn: false,
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		changeAuthenticationState(state, action) {
			state.isSignedIn = action.payload;
		},
	},
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
