import { useState, useEffect } from 'react';

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

const ImagesThubmnails = ({ urls, alts, setActualImageIndex, imgIndex }) => {
	const initialThumbnailClasses = initializeThumbnailClasses(urls);

	const [thumbnailsClasses, setThumbnailsClasses] = useState({
		...initialThumbnailClasses,
		0: `${classes.img} ${classes['img-active']}`,
	});

	useEffect(() => {
		setThumbnailsClasses(prev => {
			const newState = { ...initialThumbnailClasses };

			newState[imgIndex - 1] = `${classes.img} ${classes['img-active']}`;

			return newState;
		});
	}, [imgIndex]);

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
					className={`${classes['img-btn']}`}
					aria-label={`thumbnail ${altIndex}`}
					onClick={() => imageIndexHandler(i)}>
					<img src={urls[i]} alt={alts[altIndex]} className={thumbnailsClasses[i]} />
				</button>
			</li>,
		);
	}

	return <ul className={classes['thumbnails']}>{thumbnails}</ul>;
};

export default ImagesThubmnails;
