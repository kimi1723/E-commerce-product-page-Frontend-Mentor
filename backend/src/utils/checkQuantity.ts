export const checkQuantity = (quantity: number) => isNaN(quantity) || quantity < 1 || !Number.isInteger(quantity);
