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
		case 'one':
			const imageRef = ref(storage, `/products/${id}/image-${id}.jpg`);
			const imageUrl = await getDownloadURL(imageRef);

			return imageUrl;
		default:
			console.log('error');
	}
};

export default getImages;
