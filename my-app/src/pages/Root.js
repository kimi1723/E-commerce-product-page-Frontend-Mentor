import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootPage = () => {
	return (
		<>
			<MainNavigation />
			<Outlet />
		</>
	);
};

export default RootPage;
