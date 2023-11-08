import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import classes from './Redirect.module.css';

const Redirect = ({ componentType, children, validated, ...props }) => {
	const scale = 1.025;

	const div = children => (
		<motion.div
			whileHover={{ scale }}
			whileFocus={{ scale }}
			transition={{ type: 'spring', stiffness: 500 }}
			className={classes.div}>
			{children}
		</motion.div>
	);

	if (componentType === 'button') {
		return div(
			<button className={classes.btn} {...props}>
				{children}
			</button>,
		);
	} else if (componentType === 'link') {
		return div(
			<Link {...props} className={classes.link}>
				{children}
			</Link>,
		);
	}
};

export default Redirect;
