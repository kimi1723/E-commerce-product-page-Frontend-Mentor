import Authentication from '../components/authentication/Authentication';
import { useSearchParams } from 'react-router-dom';

const AuthenticationPage = () => {
	const [searchParams] = useSearchParams();

	const isSignIn = searchParams.get('mode') === 'signin';

	return <Authentication isSignIn={isSignIn} />;
};

export default AuthenticationPage;
