import React from 'react';

class SideNav extends React.Component {
	render() {
		return (
			<nav className="nav flex-column">
				<button
					name="2017-06-22"
					className="btn btn-outline-primary btn-lg btn-block"
					role="button"
					onClick={() => this.props.filterDate('2017-06-29')}
				>
					Filter Date
				</button>
				<button
					name="Greenwald Pavilion"
					className="btn btn-outline-primary btn-lg btn-block"
					role="button"
					onClick={() => this.props.filterLocation('Greenwald%20Pavilion')}
				>
					Filter Location
				</button>
				<a className="nav-link" href="">
					Link
				</a>
				<a className="nav-link" href="">
					Disabled
				</a>
			</nav>
		);
	}
}

export default SideNav;
