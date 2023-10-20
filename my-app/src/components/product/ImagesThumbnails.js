import { useState, useEffect } from 'react';

import classes from './ImagesThumbnails.module.css';

const initializeThumbnailClasses = urls => {
	const initialThumbnailClasses = {};

	urls.forEach((url, index) => {
		if (index % 2 === 0) {
			initialThumbnailClasses[index] = `${classes['img-btn']}`;
		}
	});

	return initialThumbnailClasses;
};

const ImagesThubmnails = ({ urls, alts, setActualImageIndex, imgIndex }) => {
	const initialThumbnailClasses = initializeThumbnailClasses(urls);

	const [thumbnailsClasses, setThumbnailsClasses] = useState({
		...initialThumbnailClasses,
		0: `${classes['img-btn']} ${classes['img-btn-active']}`,
	});

	useEffect(() => {
		setThumbnailsClasses(prev => {
			const newState = { ...initialThumbnailClasses };

			newState[imgIndex - 1] = `${classes['img-btn']} ${classes['img-btn-active']}`;

			return newState;
		});
	}, [imgIndex, initialThumbnailClasses]);

	const imageIndexHandler = index => {
		setActualImageIndex(index + 1);
	};

	const thumbnails = [];

	for (let i = 0, j = 1; i < urls.length; i += 2, j++) {
		const altIndex = `image${j}`;

		thumbnails.push(
			<li key={urls[i]}>
				<button
					type="button"
					className={thumbnailsClasses[i]}
					aria-label={`thumbnail ${altIndex}`}
					onClick={() => imageIndexHandler(i)}>
					<img src={urls[i]} alt={alts[altIndex]} className={`${classes.img}`} />
				</button>
			</li>,
		);
	}

	return <ul className={classes['thumbnails']}>{thumbnails}</ul>;
};

export default ImagesThubmnails;
