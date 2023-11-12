import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignedIn: false,
	email: '',
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		changeAuthenticationState(state, action) {
			const { isSignedIn, email = '' } = action.payload;

			state.isSignedIn = isSignedIn;
			state.email = email;
		},
	},
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
