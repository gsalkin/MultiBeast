import React from 'react';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
	render() {
		// const reloadPage = () => {
		// 	window.reload(true)
		// }
		return (
			<nav className="navbar navbar-light">
				<NavLink className="navbar-brand" to="/view/all" onClick={this.props.filter}>
					<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
					&nbsp;
					MultiBeast
				</NavLink>
				<div className="form-inline">
					<h3>
						<NavLink onClick={this.props.filter} to="/view/season/SH%202018" className={'btn purple__aspen ' + this.props.status}>
							Aspen Ideas Health
						</NavLink>
						&nbsp;
						<NavLink onClick={this.props.filter} to="/view/season/AIF%202018" className={'btn brightblue__aspen ' + this.props.status}>
							Aspen Ideas Festival
						</NavLink>
					</h3>
				</div>
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<NavLink className={'nav-link ' + this.props.status} to="/admin" tabIndex="-1" aria-disabled="true">
							Admin
						</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Header;
