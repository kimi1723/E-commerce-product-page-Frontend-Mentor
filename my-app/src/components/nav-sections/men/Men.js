import Product from '../Product';
import PageContent from '../../ui/PageContent';
import { ulClasses } from '../../ui/PageContent';

const Men = ({ productsData }) => {
	const title = 'Men';
	const products = productsData.map(product => <Product key={product.id} product={product} />);

	return <PageContent title={title}>{<ul className={ulClasses}>{products}</ul>} </PageContent>;
};

export default Men;
