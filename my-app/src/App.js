import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { deviceTypeSlice } from './store';
import RootPage from './pages/Root';
import ErrorPage from './pages/Error';
import ProductPage from './pages/Product';
import LightboxPage from './pages/Lightbox';
import CheckoutPage from './pages/Checkout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/products/:id',
				element: <ProductPage />,
				children: [{ path: 'lightbox-gallery', element: <LightboxPage /> }],
			},
			{ path: '/checkout', element: <CheckoutPage /> },
		],
	},
]);

function App() {
	const dispatch = useDispatch();
	dispatch(deviceTypeSlice.actions.detectDeviceType());

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
