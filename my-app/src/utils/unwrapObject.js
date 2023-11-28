const unwrapObject = (keys, initialObject) =>
	keys.reduce((subsetObject, key) => ({ ...subsetObject, [key]: initialObject[key] }), {});

export default unwrapObject;
