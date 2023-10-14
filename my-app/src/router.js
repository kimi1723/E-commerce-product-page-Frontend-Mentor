import { createBrowserRouter } from 'react-router-dom';

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
import FallPage from './pages/Fall';
import SpringPage from './pages/Spring';
import { productLoader } from './pages/Product';
import { loader as homeProductsLoader } from './pages/Home';
import { loader as menProductsLoader } from './pages/Men';
import { loader as womenProductsLoader } from './pages/Women';
import { loader as fallProductsLoader } from './pages/Fall';
import { loader as springProductsLoader } from './pages/Spring';

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
			{ path: '/checkout', element: <CheckoutPage /> },
		],
	},
]);

export default router;
