import { useSelector } from 'react-redux';
import Wrapper from './Wrapper';
import Error from './Error';

import classes from './PageContent.module.css';

const PageContent = ({ children, title }) => {
	const isError = useSelector(state => state.error.isError);

	return (
		<Wrapper>
			<main className={classes.main}>
				<h1 className={classes.h1}>{title}</h1>
				{isError === true && <Error />}
				{children}
			</main>
		</Wrapper>
	);
};

export default PageContent;
