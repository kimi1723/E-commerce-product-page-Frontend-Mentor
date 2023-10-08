import { useState, useEffect } from 'react';

import classes from './ImagesGallery.module.css';
import prevIcon from '../../assets/images/icon-previous.svg';
import nextIcon from '../../assets/images/icon-next.svg';

const ImagesGallery = ({ urls, alts, isMobile }) => {
	const [actualImageIndex, setActualImageIndex] = useState(1);

	const cacheImages = async urls => {
		const promises = await urls.map(url => {
			return new Promise((resolve, reject) => {
				const img = new Image();

				img.src = url;
				img.onload = resolve();
				img.onerror = reject();
			});
		});
		await Promise.all(promises);
	};

	useEffect(() => {
		cacheImages(urls);
	});

	const imageIndexMobileHandler = whereTo => {
		setActualImageIndex(prevIndex => {
			switch (whereTo) {
				case 'previous':
					return prevIndex < 3 ? (prevIndex = 7) : (prevIndex -= 2);

				case 'next':
					return prevIndex < 7 ? (prevIndex += 2) : (prevIndex = 1);
				default:
					return console.log('error');
			}
		});
	};

	const imageAltHandler = () => {
		switch (actualImageIndex) {
			case 1:
				return alts.image1;
			case 3:
				return alts.image2;
			case 5:
				return alts.image3;
			case 7:
				return alts.image4;
			default:
				return console.log('error');
		}
	};

	const imageIndexDesktopHandler = index => {
		setActualImageIndex(index);
	};

	const imageAlt = imageAltHandler();

	return (
		<section className={classes.gallery}>
			{isMobile && (
				<button className={classes['carousel-icon']} onClick={() => imageIndexMobileHandler('previous')}>
					<img src={prevIcon} alt="" />
				</button>
			)}
			<img src={urls[actualImageIndex]} alt={imageAlt} className={classes['main-img']} />
			{isMobile && (
				<button className={classes['carousel-icon']} onClick={() => imageIndexMobileHandler('next')}>
					<img src={nextIcon} alt="" />
				</button>
			)}
			{!isMobile && (
				<div className={classes['thumbnails']}>
					<button
						type="button"
						className={classes['img-btn']}
						aria-label="thumbnail image 1"
						onClick={() => imageIndexDesktopHandler(1)}>
						<img src={urls[0]} alt={alts.image1} className={classes.img} />
					</button>
					<button
						type="button"
						className={classes['img-btn']}
						aria-label="thumbnail image 2"
						onClick={() => imageIndexDesktopHandler(3)}>
						<img src={urls[2]} alt={alts.image2} className={classes.img} />
					</button>
					<button
						type="button"
						className={classes['img-btn']}
						aria-label="thumbnail image 3"
						onClick={() => imageIndexDesktopHandler(5)}>
						<img src={urls[4]} alt={alts.image3} className={classes.img} />
					</button>
					<button
						type="button"
						className={classes['img-btn']}
						aria-label="thumbnail image 4"
						onClick={() => imageIndexDesktopHandler(7)}>
						<img src={urls[6]} alt={alts.image4} className={classes.img} />
					</button>
				</div>
			)}
		</section>
	);
};

export default ImagesGallery;
