import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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
	const { imgUrl } = useLoaderData();

	return (
		<Wrapper>
			<Product imgUrl={imgUrl} />
			<Outlet />
		</Wrapper>
	);
};

export const loader = async ({ request, params }) => {
	const id = params.id;

	const response = await getDownloadURL(ref(storage, `products/${id}/image-${id}.jpg`)).then(url => url);

	return { imgUrl: response };
};

export default ProductPage;
