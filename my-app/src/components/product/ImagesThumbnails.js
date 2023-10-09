import { useState } from 'react';

import classes from './ImagesThumbnails.module.css';

const initialThumbnailClasses = {
	1: `${classes.img} `,
	3: `${classes.img} `,
	5: `${classes.img} `,
	7: `${classes.img}`,
};

const ImagesThubmnails = ({ urls, alts, setActualImageIndex }) => {
	const [thumbnailsClasses, setThumbnailsClasses] = useState({
		...initialThumbnailClasses,
		1: `${classes.img} ${classes['img-active']}`,
	});

	const imageIndexDesktopHandler = index => {
		setActualImageIndex(index);
		setThumbnailsClasses(prev => {
			const newState = { ...initialThumbnailClasses };

			newState[index] = `${classes.img} ${classes['img-active']}`;

			return newState;
		});
	};
	return (
		<div className={classes['thumbnails']}>
			<button
				type="button"
				className={`${classes['img-btn']}`}
				aria-label="thumbnail image 1"
				onClick={() => imageIndexDesktopHandler(1)}>
				<img src={urls[0]} alt={alts.image1} className={thumbnailsClasses[1]} />
			</button>
			<button
				type="button"
				className={classes['img-btn']}
				aria-label="thumbnail image 2"
				onClick={() => imageIndexDesktopHandler(3)}>
				<img src={urls[2]} alt={alts.image2} className={thumbnailsClasses[3]} />
			</button>
			<button
				type="button"
				className={classes['img-btn']}
				aria-label="thumbnail image 3"
				onClick={() => imageIndexDesktopHandler(5)}>
				<img src={urls[4]} alt={alts.image3} className={thumbnailsClasses[5]} />
			</button>
			<button
				type="button"
				className={classes['img-btn']}
				aria-label="thumbnail image 4"
				onClick={() => imageIndexDesktopHandler(7)}>
				<img src={urls[6]} alt={alts.image4} className={thumbnailsClasses[7]} />
			</button>
		</div>
	);
};

export default ImagesThubmnails;
