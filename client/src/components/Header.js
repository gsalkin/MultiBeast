import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
	render() {
		// const reloadPage = () => {
		// 	window.reload(true)
		// }
		return (
			<nav className="navbar navbar-light">
				<Link className="navbar-brand" to="/view/all" onClick={this.props.filter}>
					<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
					&nbsp;
					MultiBeast
				</Link>
				<div className="form-inline">
					<h3>
						<Link onClick={this.props.filter} to="/view/season/SH%202018" className={'btn purple__aspen ' + this.props.status}>
							Aspen Ideas Health
						</Link>
						&nbsp;
						<Link onClick={this.props.filter} to="/view/season/AIF%202018" className={'btn brightblue__aspen ' + this.props.status}>
							Aspen Ideas Festival
						</Link>
					</h3>
				</div>
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<Link className={'nav-link ' + this.props.status} to="/admin" tabIndex="-1" aria-disabled="true">
							Admin
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Header;
