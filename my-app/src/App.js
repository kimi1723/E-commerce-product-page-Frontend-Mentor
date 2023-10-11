import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { detectDeviceTypeActions } from './store/detectDeviceType-slice';
import RootPage from './pages/Root';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import ProductPage from './pages/Product';
import CheckoutPage from './pages/Checkout';
import CollectionsPage from './pages/Collections';
import MenPage from './pages/Men';
import WomenPage from './pages/Women';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import { loader as productLoader } from './pages/Product';
import { productsLoader } from './pages/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage />, loader: productsLoader },
			{
				path: '/products/:id',
				element: <ProductPage />,
				loader: productLoader,
			},
			{ path: '/collections', element: <CollectionsPage /> },
			{ path: '/men', element: <MenPage /> },
			{ path: '/women', element: <WomenPage /> },
			{ path: '/about', element: <AboutPage /> },
			{ path: '/contact', element: <ContactPage /> },
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
