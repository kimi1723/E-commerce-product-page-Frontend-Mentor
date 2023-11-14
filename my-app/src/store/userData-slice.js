import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
	personalInformation: [],
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
		handlePersonalInformaiton(state, action) {},
		handleShipmentInformation(state, action) {},
	},
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice.reducer;
