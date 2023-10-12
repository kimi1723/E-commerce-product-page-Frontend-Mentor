import PageContent from '../ProductsPageContent';

const Home = ({ productsData }) => {
	const title = 'sneakers';

	return <PageContent productsData={productsData} title={title} />;
};

export default Home;
