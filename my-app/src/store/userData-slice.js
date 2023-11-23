import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
	personalInformation: {},
	shipmentInformation: [],
};

const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		addNewOrder(state, action) {
			const newOrder = action.payload;

			state.orders.push(newOrder);
		},
		handlePersonalInformation(state, { payload: { email, password } }) {
			state.personalInformation.email = email;
			state.personalInformation.password = password;
		},
		handleShipmentInformation(state, action) {},
	},
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice.reducer;
