import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { detectDeviceTypeActions } from './store/detectDeviceType-slice';

import router from './router';
import getCartData from './hooks/useCartData';

function App() {
	getCartData();
	useEffect(() => {});

	const dispatch = useDispatch();

	const detectDeviceHandler = () => {
		const isMobile = window.innerWidth < 992 ? true : false;

		dispatch(detectDeviceTypeActions.detectDeviceType(isMobile));
	};

	window.addEventListener('resize', detectDeviceHandler);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
