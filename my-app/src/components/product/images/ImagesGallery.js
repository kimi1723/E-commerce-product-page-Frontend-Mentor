import { useState, useEffect } from 'react';
import ImagesThubmnails from './thumbnails/ImagesThumbnails';
import cacheImages from '../../../utils/cacheImages';
import Lightbox from './lightbox/LightBox';
import MainImageCarousel from './carousel/MainImageCarousel';

import classes from './ImagesGallery.module.css';

const ImagesGallery = ({ urls, alts, isMobile }) => {
	const [actualImageIndex, setActualImageIndex] = useState(1);
	const [isLightBoxVisible, setIsLightBoxVisible] = useState(false);
	const numberOfUrls = urls.length;

	useEffect(() => {
		cacheImages(urls);
	});

	const carouselHandler = whereTo => {
		setActualImageIndex(prevIndex => {
			switch (whereTo) {
				case 'previous':
					return prevIndex < 3 ? (prevIndex = numberOfUrls - 1) : (prevIndex -= 2);

				case 'next':
					return prevIndex < numberOfUrls - 1 ? (prevIndex += 2) : (prevIndex = 1);
				default:
					return console.error('error');
			}
		});
	};

	const hideLightBoxHandler = () => {
		setIsLightBoxVisible(false);
	};

	const showLightBoxHandler = () => {
		!isMobile && setIsLightBoxVisible(true);
	};

	return (
		<section className={classes.gallery}>
			{isLightBoxVisible && !isMobile && (
				<Lightbox
					urls={urls}
					carouselHandler={carouselHandler}
					alts={alts}
					imgIndex={actualImageIndex}
					setActualImageIndex={setActualImageIndex}
					hideLightBox={hideLightBoxHandler}
				/>
			)}
			<MainImageCarousel
				urls={urls}
				showCarousel={isMobile}
				carouselHandler={carouselHandler}
				alts={alts}
				imgIndex={actualImageIndex}
				showLightBox={showLightBoxHandler}
				isMobile={isMobile}
			/>
			{!isMobile && (
				<ImagesThubmnails
					setActualImageIndex={setActualImageIndex}
					urls={urls}
					alts={alts}
					imgIndex={actualImageIndex}
				/>
			)}
		</section>
	);
};

export default ImagesGallery;
