import { Outlet } from 'react-router-dom';
import Account from '../../components/account/Account';

const AccountPage = () => {
	return (
		<Account>
			<Outlet />
		</Account>
	);
};

export default AccountPage;
