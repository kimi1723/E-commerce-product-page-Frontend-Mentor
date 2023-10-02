import { Outlet } from 'react-router-dom';
import Wrapper from '../components/ui/Wrapper';
import Header from '../components/layout/Header';

const RootPage = () => {
	return (
		<Wrapper>
			<Header />
			<Outlet />
		</Wrapper>
	);
};

export default RootPage;
