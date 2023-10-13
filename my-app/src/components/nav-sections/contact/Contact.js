import PageContent from '../../ui/PageContent';

import classes from './Contact.module.css';

const Contact = () => {
	const title = 'Contact';

	return (
		<PageContent title={title}>
			<address className={classes.main}>
				<h2 className={classes.h2}>Feel free to DM me on any platform of your choice!</h2>
				<ul className={classes.list}>
					<li>
						<a href="https://github.com/kimi1723" rel="noopener noreferrer" target="_blank" className={classes.link}>
							Github
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/patryk-s%C4%85siadek-12b162294/"
							rel="noopener noreferrer"
							target="_blank"
							className={classes.link}>
							Linkedin
						</a>
					</li>
					<li>
						<a
							href="https://www.frontendmentor.io/profile/kimi1723"
							rel="noopener noreferrer"
							target="_blank"
							className={classes.link}>
							Frontend Mentor
						</a>
					</li>
				</ul>
			</address>
		</PageContent>
	);
};

export default Contact;
