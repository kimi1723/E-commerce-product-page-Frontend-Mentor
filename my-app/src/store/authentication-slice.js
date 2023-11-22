import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignedIn: false,
	email: '',
	signedOutByLogout: false,
	justSignedIn: false,
	userAccountUid: '',
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		changeAuthenticationState(state, action) {
			const {
				isSignedIn,
				email = '',
				signedOutByLogout = false,
				justSignedIn = false,
				userAccountUid,
			} = action.payload;

			state.isSignedIn = isSignedIn;
			state.email = email;
			state.signedOutByLogout = signedOutByLogout;
			state.justSignedIn = justSignedIn;
			state.userAccountUid = userAccountUid;
		},
	},
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
