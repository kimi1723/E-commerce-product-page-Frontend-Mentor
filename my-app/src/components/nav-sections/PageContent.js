import Product from './Product';

import Wrapper from '../ui/Wrapper';

import classes from './PageContent.module.css';

const PageContent = ({ productsData, title }) => {
	const products = productsData.map(product => <Product key={product.id} product={product} />);

	return (
		<Wrapper>
			<main className={classes.main}>
				<h1 className={classes.h1}>{title}</h1>
				<ul className={classes.ul}>{products}</ul>
			</main>
		</Wrapper>
	);
};

export default PageContent;
