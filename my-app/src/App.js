import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { detectDeviceTypeActions } from './store/detectDeviceType-slice';
import RootPage from './pages/Root';
import ErrorPage from './pages/Error';
import ProductPage from './pages/Product';
import LightboxPage from './pages/Lightbox';
import CheckoutPage from './pages/Checkout';
import { loader as productLoader } from './pages/Product';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/products/:id',
				element: <ProductPage />,
				loader: productLoader,
				children: [{ path: 'lightbox-gallery', element: <LightboxPage /> }],
			},
			{ path: '/checkout', element: <CheckoutPage /> },
		],
	},
]);

function App() {
	const dispatch = useDispatch();

	const detectDeviceHandler = () => {
		const isMobile = window.innerWidth < 768 ? true : false;

		dispatch(detectDeviceTypeActions.detectDeviceType(isMobile));
	};

	window.addEventListener('resize', detectDeviceHandler);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
