import { createBrowserRouter } from 'react-router-dom';

import RootPage from './pages/Root';
import HomePage from './pages/nav-sections/Home';
import ErrorPage from './pages/Error';
import ProductPage from './pages/Product';
import CheckoutPage from './pages/checkout/Checkout';
import CollectionsPage from './pages/nav-sections/collections/Collections';
import MenPage from './pages/nav-sections/Men';
import WomenPage from './pages/nav-sections/Women';
import AboutPage from './pages/nav-sections/About';
import ContactPage from './pages/nav-sections/Contact';
import FallPage from './pages/nav-sections/collections/Fall';
import SpringPage from './pages/nav-sections/collections/Spring';
import CheckoutSummary from './pages/checkout/CheckoutSummary';
import CheckoutDetails from './pages/checkout/CheckoutDetails';

import { productLoader } from './pages/Product';
import { loader as homeProductsLoader } from './pages/nav-sections/Home';
import { loader as menProductsLoader } from './pages/nav-sections/Men';
import { loader as womenProductsLoader } from './pages/nav-sections/Women';
import { loader as fallProductsLoader } from './pages/nav-sections/collections/Fall';
import { loader as springProductsLoader } from './pages/nav-sections/collections/Spring';
import { loader as checkoutDetailsLoader } from './pages/checkout/CheckoutDetails';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage />, loader: homeProductsLoader },
			{
				path: '/products/:id',
				element: <ProductPage />,
				loader: productLoader,
			},
			{
				path: '/collections',

				children: [
					{ index: true, element: <CollectionsPage /> },
					{
						path: 'fall',
						element: <FallPage />,
						loader: fallProductsLoader,
					},
					{
						path: 'spring',
						element: <SpringPage />,
						loader: springProductsLoader,
					},
				],
			},
			{ path: '/men', element: <MenPage />, loader: menProductsLoader },
			{ path: '/women', element: <WomenPage />, loader: womenProductsLoader },
			{ path: '/about', element: <AboutPage /> },
			{ path: '/contact', element: <ContactPage /> },
			{
				path: '/checkout',
				element: <CheckoutPage />,
				children: [
					{ index: true, element: <CheckoutSummary /> },
					{ path: 'details', element: <CheckoutDetails />, loader: checkoutDetailsLoader },
				],
			},
		],
	},
]);

export default router;
