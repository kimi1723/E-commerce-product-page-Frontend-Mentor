import { Link } from 'react-router-dom';

import classes from './Link.module.css';

const LinkComponent = ({ path, content }) => {
	return (
		<Link to={path} className={classes.link}>
			{content}
		</Link>
	);
};

export default LinkComponent;
