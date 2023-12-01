import { Link } from 'react-router-dom';

import Logo from '../../ui/logo/Logo';
import Wrapper from '../../ui/wrappers/wrapper/Wrapper';
import classes from './Footer.module.css';

const Footer = () => {
	return (
		<Wrapper>
			<footer className={classes.footer}>
				<div className={classes['main-container']}>
					<Logo additionalClasses={classes.logo} />
					<nav>
						<ul className={classes.ul}>
							<li className={classes.li}>
								<Link to="/collections" className={classes.link}>
									Collections
								</Link>
							</li>
							<li className={classes.li}>
								<Link to="/men" className={classes.link}>
									Men
								</Link>
							</li>
							<li className={classes.li}>
								<Link to="/women" className={classes.link}>
									Women
								</Link>
							</li>
							<li className={classes.li}>
								<Link to="/about" className={classes.link}>
									About
								</Link>
							</li>
							<li className={classes.li}>
								<Link to="/contact" className={classes.link}>
									Contact
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
			<div className={classes.custom}></div>
		</Wrapper>
	);
};

export default Footer;
