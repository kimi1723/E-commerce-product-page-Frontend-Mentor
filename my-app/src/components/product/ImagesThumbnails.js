import { useState } from 'react';

import classes from './ImagesThumbnails.module.css';

const initialThumbnailClasses = {
	0: `${classes.img} `,
	2: `${classes.img} `,
	4: `${classes.img} `,
	6: `${classes.img}`,
};

const ImagesThubmnails = ({ urls, alts, setActualImageIndex }) => {
	const [thumbnailsClasses, setThumbnailsClasses] = useState({
		...initialThumbnailClasses,
		1: `${classes.img} ${classes['img-active']}`,
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

	for (let i = 0; i < urls.length; i += 2) {
		thumbnails.push(
			<button
				type="button"
				className={`${classes['img-btn']}`}
				aria-label="thumbnail image 1"
				onClick={() => imageIndexDesktopHandler(i)}>
				<img src={urls[i]} alt={alts.image1} className={thumbnailsClasses[i]} />
			</button>,
		);
	}

	return <div className={classes['thumbnails']}>{thumbnails}</div>;
};

export default ImagesThubmnails;
