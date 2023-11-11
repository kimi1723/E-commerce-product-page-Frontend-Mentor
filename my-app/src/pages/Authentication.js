import Authentication from '../components/authentication/Authentication';

const AuthenticationPage = () => {
	return <Authentication />;
};

export const action = async ({ request }) => {
	console.log(request);
};
export default AuthenticationPage;
