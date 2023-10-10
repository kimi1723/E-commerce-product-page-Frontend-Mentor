import { useState } from 'react';

import classes from './ImagesThumbnails.module.css';

const initializeThumbnailClasses = urls => {
	const initialThumbnailClasses = {};

	urls.forEach((url, index) => {
		if (index % 2 === 0) {
			initialThumbnailClasses[index] = `${classes.img}`;
		}
	});

	return initialThumbnailClasses;
};

const ImagesThubmnails = ({ urls, alts, setActualImageIndex }) => {
	const initialThumbnailClasses = initializeThumbnailClasses(urls);

	const [thumbnailsClasses, setThumbnailsClasses] = useState({
		...initialThumbnailClasses,
		0: `${classes.img} ${classes['img-active']}`,
	});

	const imageIndexDesktopHandler = index => {
		setActualImageIndex(index + 1);
		setThumbnailsClasses(prev => {
			const newState = { ...initialThumbnailClasses };

			newState[index] = `${classes.img} ${classes['img-active']}`;

			return newState;
		});
	};

	const thumbnails = [];

	for (let i = 0, j = 1; i < urls.length; i += 2, j++) {
		const altIndex = `image${j}`;

		thumbnails.push(
			<li key={urls[i]}>
				<button
					type="button"
					className={`${classes['img-btn']}`}
					aria-label={`thumbnail ${altIndex}`}
					onClick={() => imageIndexDesktopHandler(i)}>
					<img src={urls[i]} alt={alts[altIndex]} className={thumbnailsClasses[i]} />
				</button>
			</li>,
		);
	}

	return <ul className={classes['thumbnails']}>{thumbnails}</ul>;
};

export default ImagesThubmnails;
