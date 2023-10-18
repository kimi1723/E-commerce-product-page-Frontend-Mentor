import Product from './Product';
import PageContent from '../ui/PageContent';
import classes from './ProductsPage.module.css';

const ProductsPage = ({ productsData, title }) => {
	if (title !== 'sneakers') {
		title = title.charAt(0).toUpperCase() + title.slice(1, title.length);
	}

	if (productsData.error) {
		return (
			<PageContent title={title}>
				{
					<>
						<p className={classes.error}>
							An error has occured!<span className={classes['error-msg']}>{productsData.error.message}</span>
						</p>
					</>
				}
			</PageContent>
		);
	} else {
		const products = productsData.map(product => <Product key={product.id} product={product} />);

		return <PageContent title={title}>{<ul className={classes.ul}>{products}</ul>} </PageContent>;
	}
};

export default ProductsPage;
