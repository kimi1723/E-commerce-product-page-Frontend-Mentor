import { useState, useEffect } from 'react';
import ImagesThubmnails from './ImagesThumbnails';
import cacheImages from '../../utils/cacheImages';

import classes from './ImagesGallery.module.css';
import prevIcon from '../../assets/images/icon-previous.svg';
import nextIcon from '../../assets/images/icon-next.svg';

const ImagesGallery = ({ urls, alts, isMobile }) => {
	const [actualImageIndex, setActualImageIndex] = useState(1);
	const numberOfUrls = urls.length;

	useEffect(() => {
		cacheImages(urls);
	});

	const imageIndexMobileHandler = whereTo => {
		setActualImageIndex(prevIndex => {
			switch (whereTo) {
				case 'previous':
					return prevIndex < 3 ? (prevIndex = numberOfUrls - 1) : (prevIndex -= 2);

				case 'next':
					return prevIndex < numberOfUrls - 1 ? (prevIndex += 2) : (prevIndex = 1);
				default:
					return console.log('error');
			}
		});
	};

	const imageAltHandler = () => {
		const altIndex = Math.round(actualImageIndex / 2);
		const key = `image${altIndex}`;

		return alts[key];
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
			{!isMobile && <ImagesThubmnails setActualImageIndex={setActualImageIndex} urls={urls} alts={alts} />}
		</section>
	);
};

export default ImagesGallery;
