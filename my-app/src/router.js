import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import LoaderSpinner from './components/ui/LoaderSpinner';

import { action as checkoutAction } from './pages/checkout/CheckoutSuccessful';
import { action as authenticationAction } from './pages/Authentication';

const RootPageLazy = lazy(() => import('./pages/Root'));
const ErrorPageLazy = lazy(() => import('./pages/Error'));
const HomePageLazy = lazy(() => import('./pages/nav-sections/Home'));
const ProductPageLazy = lazy(() => import('./pages/Product'));
const CollectionsPageLazy = lazy(() => import('./pages/nav-sections/collections/Collections'));
const FallPageLazy = lazy(() => import('./pages/nav-sections/collections/Fall'));
const SpringPageLazy = lazy(() => import('./pages/nav-sections/collections/Spring'));
const MenPageLazy = lazy(() => import('./pages/nav-sections/Men'));
const WomenPageLazy = lazy(() => import('./pages/nav-sections/Women'));
const AboutPageLazy = lazy(() => import('./pages/nav-sections/About'));
const ContactPageLazy = lazy(() => import('./pages/nav-sections/Contact'));
const CheckoutPageLazy = lazy(() => import('./pages/checkout/Checkout'));
const CheckoutDetailsLazy = lazy(() => import('./pages/checkout/CheckoutDetails'));
const CheckoutSuccessfulLazy = lazy(() => import('./pages/checkout/CheckoutSuccessful'));
const CheckoutSummaryLazy = lazy(() => import('./pages/checkout/CheckoutSummary'));
const AuthenticationPageLazy = lazy(() => import('./pages/Authentication'));
const AccountPageLazy = lazy(() => import('./pages/account/Account'));
const OrdersPageLazy = lazy(() => import('./pages/account/Orders'));
const PersonalInformationPageLazy = lazy(() => import('./pages/account/PersonalInformation'));
const ShipmentDetailsPageLazy = lazy(() => import('./pages/account/ShipmentDetails'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LoaderSpinner />}>
				<RootPageLazy />
			</Suspense>
		),
		errorElement: (
			<Suspense fallback={<LoaderSpinner />}>
				<ErrorPageLazy />
			</Suspense>
		),
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
			{
				path: '/about',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<AboutPageLazy />
					</Suspense>
				),
			},
			{
				path: '/contact',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<ContactPageLazy />
					</Suspense>
				),
			},
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
				],
			},
			{
				path: 'checkout-successful',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<CheckoutSuccessfulLazy />
					</Suspense>
				),
				action: checkoutAction,
			},
			{
				path: 'account',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<AccountPageLazy />
					</Suspense>
				),
				children: [
					{
						path: 'orders',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<OrdersPageLazy />
							</Suspense>
						),
					},
					{
						path: 'personal-information',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<PersonalInformationPageLazy />
							</Suspense>
						),
					},
					{
						path: 'shipment-details',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<ShipmentDetailsPageLazy />
							</Suspense>
						),
					},
				],
			},
			{
				path: 'authentication',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<AuthenticationPageLazy />
					</Suspense>
				),
				action: authenticationAction,
			},
		],
	},
]);

export default router;
