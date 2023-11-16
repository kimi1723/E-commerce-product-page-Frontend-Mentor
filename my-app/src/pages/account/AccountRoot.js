import { Outlet } from 'react-router-dom';
import AccountRoot from '../../components/account/AccountRoot';

const RootPage = () => {
	return (
		<AccountRoot>
			<Outlet />
		</AccountRoot>
	);
};

export default RootPage;
