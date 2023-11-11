import { useSearchParams } from 'react-router-dom';

import Authentication from '../components/authentication/Authentication';

const AuthenticationPage = () => {
	const [searchParams] = useSearchParams();

	const isSignIn = searchParams.get('mode') === 'signin';

	return <Authentication isSignIn={isSignIn} />;
};

export default AuthenticationPage;
