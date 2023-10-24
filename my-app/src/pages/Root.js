import { Outlet } from 'react-router-dom';
import Wrapper from '../components/ui/wrappers/Wrapper';
import Header from '../components/header/Header';
import { useSelector } from 'react-redux';
import Error from '../components/ui/modals/Error';

const RootPage = () => {
	const isError = useSelector(state => state.error.isError);

	return (
		<Wrapper>
			{isError === true && <Error />}
			<Header />
			<Outlet />
		</Wrapper>
	);
};

export default RootPage;
