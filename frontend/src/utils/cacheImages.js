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

export default cacheImages;
