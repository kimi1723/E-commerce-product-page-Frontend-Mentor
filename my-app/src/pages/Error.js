import { useRouteError } from 'react-router-dom';

import Header from '../components/header/Header';
import Wrapper from '../components/ui/wrappers/Wrapper';
import Error from '../components/error/Error';

const ErrorPage = () => {
	const error = useRouteError();

	let title = 'An error occured!';
	let message = 'Something went wrong!';

	if (error.status === undefined || error.status === 404) {
		title = 'Not found!';
		message = 'Could not find resources or page.';
	}

	return (
		<Wrapper>
			<Header />
			<Error title={title} message={message} />
		</Wrapper>
	);
};

export default ErrorPage;
