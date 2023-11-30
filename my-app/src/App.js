import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { detectDeviceTypeActions } from './store/detectDeviceType-slice';
import router from './router';
import useCartData from './hooks/useCartData';
import useSendCartData from './hooks/useSendCartData';

function App() {
	const dispatch = useDispatch();

	useSendCartData();
	useCartData();

	useEffect(() => {
		const detectDeviceHandler = () => {
			const isMobile = window.innerWidth < 992 ? true : false;

			dispatch(detectDeviceTypeActions.detectDeviceType(isMobile));
		};

		window.addEventListener('resize', detectDeviceHandler);
	}, []);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
