import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
import { getDatabase, ref as databaseRef, get } from 'firebase/database';
import { useLoaderData, json } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Product from '../components/product/Product';
import Wrapper from '../components/ui/Wrapper';

const firebaseConfig = {
	apiKey: 'AIzaSyCU0TDnQ3VtHG8olkS32xGbJejiJwlr-T8',
	authDomain: 'react-cdfed.firebaseapp.com',
	databaseURL: 'https://react-cdfed-default-rtdb.firebaseio.com',
	projectId: 'react-cdfed',
	storageBucket: 'gs://react-cdfed.appspot.com',
	messagingSenderId: '425753321003',
	appId: '1:425753321003:web:725b498f3cfd8dd4e8946e',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ProductPage = () => {
	const { productDetails, imagesData } = useLoaderData();

	return (
		<Wrapper>
			<Product productDetails={productDetails} imagesData={imagesData} />
			<Outlet />
		</Wrapper>
	);
};

export const loader = async ({ params }) => {
	const database = getDatabase();
	const id = params.id;
	const productRef = databaseRef(database, `/products/${id}`);
	const imagesRef = storageRef(storage, `products/${id}`);

	const snapshot = await get(productRef);
	const productData = snapshot.val();
	const images = await listAll(imagesRef);
	const { items } = images;

	const imagesUrls = await Promise.all(items.map(item => getDownloadURL(item)));

	const { imagesAlts, ...productDetails } = productData;

	const imagesData = {
		urls: imagesUrls,
		alts: imagesAlts,
	};

	return { productDetails, imagesData };
};

export default ProductPage;
