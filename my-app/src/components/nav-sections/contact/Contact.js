import PageContent from '../../ui/wrappers/PageContent';
import { motion } from 'framer-motion';

import classes from './Contact.module.css';

const Contact = () => {
	const title = 'Contact';
	const liContentArray = [
		{ link: 'https://github.com/kimi1723', textContent: 'Github' },
		{ link: 'https://www.linkedin.com/in/patryk-s%C4%85siadek-12b162294/', textContent: 'Linkedin' },
		{ link: 'https://www.frontendmentor.io/profile/kimi1723', textContent: '	Frontend Mentor' },
	];

	const listContent = liContentArray.map(liContent => {
		const { link, textContent } = liContent;

		return (
			<motion.li
				key={link + textContent}
				variants={{ hover: { scale: 1.1 } }}
				whileHover="hover"
				transition={{ type: 'spring', stiffnes: 100, duration: 0.3 }}>
				<a href={link} rel="noopener noreferrer" target="_blank" className={classes.link}>
					{textContent}
				</a>
			</motion.li>
		);
	});

	return (
		<PageContent title={title}>
			<address className={classes.main}>
				<h2 className={classes.h2}>Feel free to DM me on any platform of your choice!</h2>
				<ul className={classes.list}>{listContent}</ul>
			</address>
		</PageContent>
	);
};

export default Contact;
