import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-light">
				<a className="navbar-brand" href="/view/all">
					<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
					&nbsp;
					MultiBeast
				</a>
				<div className="form-inline">
					<h3>
						<a href="/view/season/SH%202018" className={'btn purple__aspen ' + this.props.status}>
							Aspen Ideas Health
						</a>
						&nbsp;
						<a href="/view/season/AIF%202018" className={'btn brightblue__aspen ' + this.props.status}>
							Aspen Ideas Festival
						</a>
					</h3>
				</div>
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<a className="nav-link disabled" href="/search">
							Search
						</a>
					</li>
					<li className="nav-item">
						<a className={'nav-link ' + this.props.status} href="/admin" tabIndex="-1" aria-disabled="true">
							Admin
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Header;
