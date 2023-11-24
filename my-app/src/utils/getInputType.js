const getInputType = key => {
	switch (key) {
		case 'email':
			return 'email';
		case 'tel':
			return 'tel';
		case 'zip-code':
			return 'number';
		default:
			return 'text';
	}
};

export default getInputType;
