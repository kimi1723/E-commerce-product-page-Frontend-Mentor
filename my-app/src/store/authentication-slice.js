import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignedIn: false,
	signedOutByLogout: false,
	justSignedIn: false,
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		changeAuthenticationState(state, action) {
			const { isSignedIn, signedOutByLogout = false, justSignedIn = false } = action.payload;

			state.isSignedIn = isSignedIn;
			state.signedOutByLogout = signedOutByLogout;
			state.justSignedIn = justSignedIn;
		},
	},
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
