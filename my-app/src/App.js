import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { detectDeviceTypeActions } from './store/detectDeviceType-slice';

import router from './router/router';
import getUid from './auth/auth';

function App() {
	useEffect(() => {
		const fetchCartData = async () => {
			const uid = await getUid();
			console.log(uid);
		};

		fetchCartData();
	});

	const dispatch = useDispatch();

	const detectDeviceHandler = () => {
		const isMobile = window.innerWidth < 992 ? true : false;

		dispatch(detectDeviceTypeActions.detectDeviceType(isMobile));
	};

	window.addEventListener('resize', detectDeviceHandler);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
