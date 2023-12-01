import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Collections.module.css';

import fall from '../../../assets/images/collections/fall.jpg';
import spring from '../../../assets/images/collections/spring.jpg';

const Collections = () => {
	const variants = {
		hidden: { scale: 0.5 },
		visible: { scale: 1 },
		hover: { scale: 1.05 },
		transition: { duration: 1, type: 'spring', bounce: 0.25 },
	};

	return (
		<main className={classes.main}>
			<h1 className={classes.title}>Collections</h1>
			<motion.section className={classes.collections}>
				<Link className={classes.link} to="fall">
					<motion.div variants={variants} initial="hidden" animate="visible" whileHover="hover" transition="transition">
						<div className={classes['hero-bg']}></div>
						<p className={classes.name}>Fall</p>
						<img src={fall} className={classes.img} alt="" />
					</motion.div>
				</Link>

				<Link className={classes.link} to="spring">
					<motion.div variants={variants} initial="hidden" animate="visible" whileHover="hover" transition="transition">
						<div className={classes['hero-bg']}></div>
						<p className={classes.name}>Spring</p>
						<img src={spring} className={classes.img} alt="" />
					</motion.div>
				</Link>
			</motion.section>
		</main>
	);
};

export default Collections;
