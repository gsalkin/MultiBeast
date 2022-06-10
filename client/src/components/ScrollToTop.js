import React from 'react';
import { scrollToTop } from '../helpers';

const ScrollToTop = () => (
	<button onClick={scrollToTop} id='myBtn' title='Go to top'>
		<i className='fa fa-chevron-up pull-right' />
		&nbsp; Scroll To Top
	</button>
);

export default ScrollToTop;