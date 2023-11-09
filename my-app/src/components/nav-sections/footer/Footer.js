import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from '../../ui/Logo';
import classes from './Footer.module.css';

const Footer = () => {
	const isLoading = useSelector(state => state.loading.isLoading);

	return (
		<>
			{!isLoading && (
				<div className={classes['footer-container']}>
					<footer className={classes.footer}>
						<div className={classes['main-container']}>
							<Logo additionalClasses={classes.logo} />
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
						</div>
					</footer>
					<address className={classes.address}>
						Coded by{' '}
						<Link to="/contact" className={classes['contact-link']}>
							Patryk Sąsiadek
						</Link>
						.
					</address>
				</div>
			)}
		</>
	);
};

export default Footer;
