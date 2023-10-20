import { useSelector, dispatch, useDispatch } from 'react-redux';
import Select from 'react-select';
import Creatable, { useCreatable } from 'react-select/creatable';
import { cartActions } from '../../store/cart-slice';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const dispatch = useDispatch();
	// const [selectValue, setSelectValue] = useState(cart.);
	const products = cart.map(product => {
		const { id, imageUrl, alt, annotation, name, originalPrice, discountedPrice, quantity } = product;

		const updateQuantity = quantity => {
			dispatch(cartActions.handleProductQuantity({ id, quantity }));
		};

		return (
			<li key={id}>
				<img src={imageUrl} alt={alt} />

				<section>
					<p>{annotation}</p>
					<h2>{name}</h2>
					<p>
						{originalPrice}
						<span>{discountedPrice}</span>
					</p>
					<Creatable
						options={[
							{ value: 1, label: 1 },
							{ value: 2, label: 2 },
						]}
						value={{ value: quantity, label: quantity }}
						onChange={e => updateQuantity(e.value)}
					/>
				</section>
			</li>
		);
	});

	return (
		<main className={classes.main}>
			<h1 className={classes.h1}>Summary</h1>
			<ul>{products}</ul>
		</main>
	);
};

export default Summary;
