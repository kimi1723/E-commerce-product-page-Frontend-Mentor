import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const getImages = async (id, action) => {
	switch (action) {
		case 'all':
			const imagesRef = ref(storage, `/products/${id}`);
			const images = await listAll(imagesRef);
			const { items } = images;

			const imagesUrls = await Promise.all(items.map(item => getDownloadURL(item)));

			return imagesUrls;
		case 'two':
			const imageRef = ref(storage, `/products/${id}/image-product-1.jpg`);
			const imageSecondRef = ref(storage, `/products/${id}/image-product-2.jpg`);

			const imageUrl = await getDownloadURL(imageRef);
			const imageSecondUrl = await getDownloadURL(imageSecondRef);

			return [imageUrl, imageSecondUrl];
		default:
			console.log('error');
	}
};

export default getImages;
