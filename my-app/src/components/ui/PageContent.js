import Wrapper from './Wrapper';
import Error from './Error';
import { useSelector } from 'react-redux';

import classes from './PageContent.module.css';

export const ulClasses = classes.ul;

const PageContent = ({ children, title }) => {
	const isError = useSelector(state => state.error.isError);

	return (
		<Wrapper>
			<main className={classes.main}>
				<h1 className={classes.h1}>{title}</h1>
				{/* {isError && <Error />} */}
				{isError && children}
			</main>
		</Wrapper>
	);
};

export default PageContent;
