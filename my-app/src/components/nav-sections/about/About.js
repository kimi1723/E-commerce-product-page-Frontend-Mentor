import { Link } from 'react-router-dom';
import PageContent from '../../ui/PageContent';

const About = () => {
	const title = 'About (me)';

	return (
		<PageContent title={title}>
			<p>
				At first it was only a project from Frontend Mentor in which I wanted to practice <strong>React-Router,</strong>{' '}
				<strong> Redux</strong> and <strong>Redux Toolkit</strong> so I would need to extend the project a little, e.g.
				create a cashout section and the cart usable and I was looking forward to do it, but going along the way of
				wanting to practice these technologies I have found myself in making the project much bigger than expected at
				first glance. However, I have really enjoyed making this page from scratch giving me the opportunity to
				consolidate knowledge and learn new things, such as:
				<ol>
					<li>Downloading plain json data from firebase database and images from storage</li>
					<li>Making paths and loaders</li>
					<li>Deffering loaders and showing loading state</li>
					<li>Splitting functions to make them reusable (e.g. for loaders)</li>
				</ol>
				For the things I would like to improve on, making the site load faster would be a good start. I have thought of
				downloading the content from firebase after the content is filtered, contrary to how it works right now but I am
				not too deep into learning more about Firebase right now. Also making the images adjusted to mobile/desktop in
				terms of size and file extension would be nice, but images provided by Frontend Mentor are only in one size, so
				I wanted to stick to it and just focus on React and other libraries. Any feedback is greatly appreciated!
				{/* <Link to="/contact">Contact</Link> */}
			</p>
		</PageContent>
	);
};

export default About;
