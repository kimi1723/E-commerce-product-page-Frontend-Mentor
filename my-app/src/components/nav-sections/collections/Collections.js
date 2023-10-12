import { Link } from 'react-router-dom';
import classes from './Collections.module.css';

import fall from '../../../assets/images/collections/fall.jpg';
import spring from '../../../assets/images/collections/spring.jpg';

const Collections = () => {
	return (
		<main className={classes.main}>
			<h1 className={classes.title}>Collections</h1>
			<section className={classes.collections}>
				<Link className={classes.link} to="fall">
					<div className={classes['hero-bg']}></div>
					<p className={classes.name}>Fall</p>
					<img src={fall} className={classes.img} alt="" />
				</Link>
				<Link className={classes.link} to="spring">
					<div className={classes['hero-bg']}></div>
					<p className={classes.name}>Spring</p>
					<img src={spring} className={classes.img} alt="" />
				</Link>
			</section>
		</main>
	);
};

export default Collections;
