import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<ul className="nav justify-content-end">
				<li className="nav-item">
					<a className="nav-link active" href="/search">
						Search
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="/logout">
						Log Out
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link disabled" href="/admin" tabindex="-1" aria-disabled="true">
						Admin
					</a>
				</li>
			</ul>
		);
	}
}

export default Header;
