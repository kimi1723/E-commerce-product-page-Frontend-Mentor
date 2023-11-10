import { motion } from 'framer-motion';
import Product from './Product';
import PageContent from '../../ui/wrappers/PageContent';

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

		return (
			<PageContent title={title}>
				<motion.ul
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
					}}
					initial="hidden"
					animate="visible"
					className={classes.ul}>
					{products}
				</motion.ul>
			</PageContent>
		);
	}
};

export default ProductsPage;
