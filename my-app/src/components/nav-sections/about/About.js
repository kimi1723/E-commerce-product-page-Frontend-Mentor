import { Link } from 'react-router-dom';
import PageContent from '../../ui/PageContent';

import classes from './About.module.css';

const About = () => {
	const title = 'About (me)';

	return (
		<PageContent title={title}>
			<article className={classes.main}>
				<article>
					<h2 className={classes.h2}>
						At first it was only a project from Frontend Mentor in which I wanted to practice
						<strong> React-Router,</strong> <strong> Redux</strong> and <strong>Redux Toolkit</strong>.
					</h2>
					In order to do this, I would need to expand the project a little, e.g. create a cashout section and the cart
					usable. I was looking forward to it and going along the way of learning these technologies I have found myself
					in making the project much bigger than expected at first glance.{' '}
				</article>

				<article className={classes.article}>
					<h2 className={classes.h2}>
						However, I have really enjoyed making this SPA from scratch giving me the opportunity to consolidate
						knowledge and learn new things, such as:
					</h2>
					<ul className={classes.list}>
						<li>
							Downloading plain json data from <span className={classes.bold}>Firebase</span> database and images from
							storage
						</li>
						<li>Making paths and loaders</li>
						<li>Deffering loaders and showing loading state</li>
						<li>Splitting functions to make them reusable (e.g. for loaders)</li>
					</ul>
				</article>

				<article className={classes.article}>
					<h2 className={classes.h2}>For the things I would like to improve the project on:</h2> making the site load
					faster would be a good start. I have thought of downloading the content from{' '}
					<span className={classes.bold}>Firebase</span> after the content is filtered, contrary to how it works right
					now but I am not too deep into learning more about it right now. Also making the images adjusted to
					<span className={classes.bold}> mobile/desktop</span> in terms of size and file extension would be nice, but
					images provided by <span className={classes.bold}>Frontend Mentor</span> are only in one size, so{' '}
					<strong>I wanted to stick to it and just focus on React and other libraries.</strong>
				</article>

				<footer className={classes.footer}>
					<h2 className={classes.h2}>
						<strong>Any feedback is greatly appreciated!</strong>
					</h2>
					<Link to="/contact" className={classes.link}>
						Contact
					</Link>
				</footer>
			</article>
		</PageContent>
	);
};

// article(ogolnie semantics) + styles + moze z firebase pobieranie tego

export default About;
