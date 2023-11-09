import { Link } from 'react-router-dom';
import PageContent from '../../ui/wrappers/PageContent';

import classes from './About.module.css';

const About = () => {
	const title = 'About (project)';

	return (
		<PageContent title={title}>
			<article className={classes.main}>
				<article>
					<h2 className={classes.h2}>
						At first it was only a project from Frontend Mentor in which I wanted to practice mainly
						<strong> React Router </strong> and a little bit of <strong> Redux (React Redux, Redux Toolkit)</strong>.
					</h2>
					In order to do this, I would need to expand the project a little, e.g. create a cashout section and the cart
					usable. I was looking forward to it and going along the way of learning these technologies I have found myself
					in making the project much bigger than expected at first glance.
				</article>

				<article className={classes.article}>
					<h2 className={classes.h2}>
						However, I have really enjoyed making this SPA from scratch giving me the opportunity to consolidate
						knowledge and learn new things, such as:
					</h2>
					<ul className={classes.list}>
						<li>
							Downloading plain json data from <span className={classes.bold}>Firebase</span> database and images from
							storage(using their library)
						</li>
						<li>Creating paths and loaders</li>
						<li>Deffering loaders and showing loading state</li>
						<li>Better understanding of splitting functions to make them reusable (e.g. for loaders)</li>
						<li>A little bit about folder structure paradigms and caching(images in this case)</li>
						<li>React Select</li>
						<li>Lazy loading</li>
						<li>Framer Motion</li>
					</ul>
				</article>

				<article className={classes.article}>
					<h2 className={classes.h2}>
						It was my first big project using a JavaScript library, and probably the biggest I have made thus far, but I
						am pretty contnet with the results as I have built more than I initially assumed. Of course though, there
						are a lot of things I need to improve on. Some of them that I would like to point out:
					</h2>{' '}
					Making the site load faster would be a great. I have thought of downloading the content from{' '}
					<span className={classes.bold}>Firebase</span> after the content is filtered, contrary to how it works right
					now but I am not too deep into learning more about <span className={classes.bold}>Firebase</span> right now.
					Caching more of the data downloaded would also be a great improvement.
					<span className={classes.br}>Making </span>
					the images adjusted to
					<span className={classes.bold}> mobile/desktop</span> in terms of size and file extension would be nice, but
					images provided by <span className={classes.bold}>Frontend Mentor</span> are only in one size, so{' '}
					<strong>I wanted to stick to it and just focus on React and other libraries.</strong>
					<span className={`${classes.bold} ${classes.br}`}> Folder structure </span>
					is also something that would use some insight and the <span className={classes.bold}>components</span> that
					are shared accross the whole page and the way they are built, but at first
					<span className={classes.bold}> I was not prepared for such a big project</span> I later on realized it is,
					but I may refactor the code later, because right now I would rather focus on learning more of{' '}
					<span className={classes.bold}>React</span>.
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

export default About;
