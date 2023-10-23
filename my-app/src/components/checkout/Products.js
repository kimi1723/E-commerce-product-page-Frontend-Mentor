import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { Link } from 'react-router-dom';
import Creatable from 'react-select/creatable';
import getDecimals from '../../utils/getDecimals';

import classes from './Products.module.css';

const Products = ({ cart }) => {
	const dispatch = useDispatch();
	const selectOptions = Array.from({ length: 11 }, (e, i) => ({ value: i, label: i }));

	const productsList = cart.map(product => {
		const { id, imageUrl, alt, annotation, name, originalPrice, discountedPrice, quantity } = product;
		const defaultValue = { value: quantity, label: quantity };

		const updateQuantity = quantity => {
			dispatch(cartActions.handleProductQuantity({ id, quantity }));
		};

		const customStyles = {
			option: (styles, state) => ({
				...styles,
				backgroundColor: state.isSelected ? 'hsl(26, 100%, 55%)' : 'white',
				transition: 'background-color 0.3s',
				cursor: 'pointer',
				'&:hover': { backgroundColor: 'hsl(25, 100%, 94%)' },
			}),
			control: (styles, state) => ({
				...styles,
				boxShadow: state.isFocused ? '0px 0px 2px 1px hsl(26, 100%, 55%)' : 'none',
				border: state.isFocused ? '1px solid hsl(26, 100%, 55%)' : '1px solid hsl(220, 13%, 13%)',
				transition: 'border 0.2s, box-shadow 0.2s',
				cursor: 'pointer',
				'&:hover': { border: '1px solid hsl(26, 100%, 55%)' },
			}),
		};

		return (
			<li key={id} className={classes.product}>
				<Link to={`/products/${id}`}>
					<img src={imageUrl} alt={alt} className={classes.img} />
				</Link>

				<section className={classes['product-details']}>
					<p className={classes.annotation}>{annotation}</p>
					<h2 className={classes.h2}>{name}</h2>
					<div className={classes.prices}>
						<p className={classes['original-price']}>${getDecimals(originalPrice * quantity)}</p>
						<p className={classes['discounted-price']}>${getDecimals(discountedPrice * quantity)}</p>
					</div>
					<Creatable
						options={selectOptions}
						value={defaultValue}
						onChange={e => updateQuantity(e.value)}
						styles={customStyles}
						maxMenuHeight={150}
						menuPlacement={'auto'}
						aria-label="Select item quantity"
					/>
				</section>
			</li>
		);
	});

	return productsList;
};

export default Products;
