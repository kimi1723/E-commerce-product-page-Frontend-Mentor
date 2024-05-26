import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import classes from './GoBackBtn.module.css';

const GoBackBtn = ({ classes: additionalClasses, whileHover, whileFocus, path }) => {
	const navigate = useNavigate();

	const goBackBtnHandler = () => {
		navigate(path);
	};

	return (
		<motion.button
			whileHover={whileHover}
			whileFocus={whileFocus}
			transition={{ type: 'spring', stiffness: 500 }}
			type="button"
			className={`${classes['go-back-btn']} ${additionalClasses}`}
			onClick={goBackBtnHandler}>
			Go back
		</motion.button>
	);
};

export default GoBackBtn;
