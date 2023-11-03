import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import ErrorPage from './pages/Error';
import AboutPage from './pages/nav-sections/About';
import ContactPage from './pages/nav-sections/Contact';
import LoaderSpinner from './components/ui/LoaderSpinner';

import { action as checkoutAction } from './pages/checkout/CheckoutDone';

const RootPageLazy = lazy(() => import('./pages/Root'));
const HomePageLazy = lazy(() => import('./pages/nav-sections/Home'));
const ProductPageLazy = lazy(() => import('./pages/Product'));
const CollectionsPageLazy = lazy(() => import('./pages/nav-sections/collections/Collections'));
const FallPageLazy = lazy(() => import('./pages/nav-sections/collections/Fall'));
const SpringPageLazy = lazy(() => import('./pages/nav-sections/collections/Spring'));
const MenPageLazy = lazy(() => import('./pages/nav-sections/Men'));
const WomenPageLazy = lazy(() => import('./pages/nav-sections/Women'));
const CheckoutPageLazy = lazy(() => import('./pages/checkout/Checkout'));
const CheckoutDetailsLazy = lazy(() => import('./pages/checkout/CheckoutDetails'));
const CheckoutDoneLazy = lazy(() => import('./pages/checkout/CheckoutDone'));
const CheckoutSummaryLazy = lazy(() => import('./pages/checkout/CheckoutSummary'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LoaderSpinner />}>
				<RootPageLazy />
			</Suspense>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<HomePageLazy />
					</Suspense>
				),
				loader: () => import('./pages/nav-sections/Home').then(module => module.loader()),
			},
			{
				path: '/products/:id',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<ProductPageLazy />
					</Suspense>
				),
				loader: meta => import('./pages/Product').then(module => module.loader(meta)),
			},
			{
				path: '/collections',
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CollectionsPageLazy />
							</Suspense>
						),
					},
					{
						path: 'fall',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<FallPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/nav-sections/collections/Fall').then(module => module.loader()),
					},
					{
						path: 'spring',
						element: (
							<Suspense falllback={<LoaderSpinner />}>
								<SpringPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/nav-sections/collections/Spring').then(module => module.loader()),
					},
				],
			},
			{
				path: '/men',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<MenPageLazy />
					</Suspense>
				),
				loader: () => import('./pages/nav-sections/Men').then(module => module.loader()),
			},
			{
				path: '/women',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<WomenPageLazy />
					</Suspense>
				),
				loader: () => import('./pages/nav-sections/Women').then(module => module.loader()),
			},
			{ path: '/about', element: <AboutPage /> },
			{ path: '/contact', element: <ContactPage /> },
			{
				path: '/checkout',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<CheckoutPageLazy />
					</Suspense>
				),
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CheckoutSummaryLazy />
							</Suspense>
						),
					},
					{
						path: 'details',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CheckoutDetailsLazy />
							</Suspense>
						),
						loader: () => import('./pages/checkout/CheckoutDetails').then(module => module.loader()),
					},
					{
						path: 'done',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CheckoutDoneLazy />
							</Suspense>
						),
						action: checkoutAction,
					},
				],
			},
		],
	},
]);

export default router;
