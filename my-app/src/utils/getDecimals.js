const getDecimals = number => {
	return Number.isInteger(number) ? `${number}.00` : number.toFixed(2);
};

export default getDecimals;
