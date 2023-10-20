import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Creatable from 'react-select/creatable';
import getDecimals from '../../utils/getDecimals';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const totalQuantity = useSelector(state => state.cart.totalQuantity);
	const dispatch = useDispatch();

	const selectOptions = Array.from({ length: 10 }, (e, i) => ({ value: i + 1, label: i + 1 }));

	const products = cart.map(product => {
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
				cursor: 'pointer',
				'&:hover': { border: '1px solid hsl(26, 100%, 55%)' },
			}),
		};

		return (
			<li key={id} className={classes.product}>
				<img src={imageUrl} alt={alt} className={classes.img} />

				<section className={classes['product-details']}>
					<p className={classes.annotation}>{annotation}</p>
					<h2 className={classes.h2}>{name}</h2>
					<div className={classes.prices}>
						<p className={classes['original-price']}>${getDecimals(discountedPrice * quantity)}</p>
						<p className={classes['discounted-price']}>${getDecimals(originalPrice * quantity)}</p>
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

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Cart summary</h1>
				<p className={classes.art}>{totalQuantity} Art.</p>
			</header>
			<main className={classes.main}>
				<ul className={classes.list} role="list">
					{products}
				</ul>
			</main>
		</>
	);
};

export default Summary;
