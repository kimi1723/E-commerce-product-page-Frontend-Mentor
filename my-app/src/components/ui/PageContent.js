import Wrapper from './Wrapper';

import classes from './PageContent.module.css';

const PageContent = ({ children, title }) => {
	return (
		<Wrapper>
			<main className={classes.main}>
				<h1 className={classes.h1}>{title}</h1>
				{children}
			</main>
		</Wrapper>
	);
};

export default PageContent;
