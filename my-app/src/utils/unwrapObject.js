const unwrapObject = (keys, initialObject) => {
	if (initialObject === null) return initialObject;

	return keys.reduce((subsetObject, key) => ({ ...subsetObject, [key]: initialObject[key] }), {});
};

export default unwrapObject;
