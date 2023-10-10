import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { detectDeviceTypeActions } from './store/detectDeviceType-slice';
import RootPage from './pages/Root';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import ProductPage from './pages/Product';
import CheckoutPage from './pages/Checkout';
import { loader as productLoader } from './pages/Product';
import { loader as homeLoader } from './pages/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage />, loader: homeLoader },
			{
				path: '/products/:id',
				element: <ProductPage />,
				loader: productLoader,
			},
			{ path: '/checkout', element: <CheckoutPage /> },
		],
	},
]);

function App() {
	const dispatch = useDispatch();

	const detectDeviceHandler = () => {
		const isMobile = window.innerWidth < 992 ? true : false;

		dispatch(detectDeviceTypeActions.detectDeviceType(isMobile));
	};

	window.addEventListener('resize', detectDeviceHandler);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
