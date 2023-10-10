import { useState, useEffect } from 'react';
import ImagesThubmnails from './ImagesThumbnails';
import cacheImages from '../../utils/cacheImages';
import Lightbox from './LightBox';
import MainImageCarousel from './MainImageCarousel';

import classes from './ImagesGallery.module.css';

const ImagesGallery = ({ urls, alts, isMobile }) => {
	const [actualImageIndex, setActualImageIndex] = useState(1);
	const [isLightBoxVisible, setIsLightBoxVisible] = useState(true);
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
					return console.log('error');
			}
		});
	};

	return (
		<section className={classes.gallery}>
			{isLightBoxVisible && (
				<Lightbox urls={urls} carouselHandler={carouselHandler} alts={alts} imgIndex={actualImageIndex} />
			)}
			<MainImageCarousel
				urls={urls}
				showCarousel={isMobile}
				carouselHandler={carouselHandler}
				alts={alts}
				imgIndex={actualImageIndex}
			/>
			{!isMobile && <ImagesThubmnails setActualImageIndex={setActualImageIndex} urls={urls} alts={alts} />}
		</section>
	);
};

export default ImagesGallery;
