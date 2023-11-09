import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Wrapper from '../components/ui/wrappers/Wrapper';
import Header from '../components/header/Header';
import Error from '../components/ui/modals/Error';
import Footer from '../components/nav-sections/footer/Footer';

const RootPage = () => {
	const isError = useSelector(state => state.error.isError);

	return (
		<Wrapper layoutWrapper={true}>
			{isError === true && <Error />}
			<Header />
			<Outlet />
			<Footer />
		</Wrapper>
	);
};

export default RootPage;
