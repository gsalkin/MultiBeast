import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import { camelCaseBreaker } from '../helpers';
import filterData from '../filterData.json';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterType: false,
			filterValue: false
		};
	}
	componentDidUpdate() {
		const { metaFilter } = this.props.filterState;
		if (metaFilter) {
			this.filterDisableController();
		}
	}

	filterDisableController = () => {
		document.querySelector('#metaForm')[0].disabled = true;
	};

	clearFilters = () => {
		this.setState({
			filterType: '',
			filterValue: ''
		});
		const forms = {
			date: document.querySelector('#dateForm'),
			location: document.querySelector('#locationForm'),
			meta: document.querySelector('#metaForm'),
			status: document.querySelector('#statusForm')
		};
		Object.keys(forms).forEach(key => {
			forms[key][0].disabled = false;
			forms[key].reset();
		});
		this.props.resetFilters();
	};

	selectChange = e => {
		e.target.disabled = true;
		this.setState(
			{
				filterType: e.target.dataset.type,
				filterValue: e.target.value
			},
			() => {
				let type = this.state.filterType;
				let value = this.state.filterValue;
				if (value === 'all') {
					this.setState({
						filterType: false,
						filterValue: false
					});
					return;
				} else {
					this.props.localFilter(type, value);
				}
			}
		);
	};

	headerDisplayController = () => {
		const width = window.innerWidth;
		let headerCSS;
		if (width > 1025) {
			headerCSS = 'fixed-top';
		} else {
			headerCSS = '';
		}
		return headerCSS;
	};

	render() {
		const today = format(new Date(), 'YYYY-MM-DD');
		const { Dates, Locations, Types, Status } = filterData;
		return (
			<Fragment>
				<nav className={'navbar navbar-light ' + this.headerDisplayController() + ' bg-light'}>
					<NavLink className="navbar-brand" to="/view/all" onClick={this.props.resetFilters}>
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast
						{this.props.slug === 'video' && ' | ' + this.props.slug.toUpperCase()}
					</NavLink>
					<div className="form-inline">
						{this.state.filterType && (
							<button type="button" className="btn btn-dark btn-sm mb-3" onClick={this.clearFilters}>
								Clear Filters
							</button>
						)}
						&nbsp;
						<form id="dateForm">
							<div className="input-group mb-3 mr-1">
								<select
									onChange={this.selectChange}
									className="form-control form-control-sm"
									id="inputDateSelect"
									data-type="date"
								>
									<option defaultValue="all" value="all">
										Date
									</option>
									{Object.entries(Dates).map(([key, value]) => (
										<option key={key} value={key} type="date">
											{value}
										</option>
									))}
								</select>
							</div>
						</form>
						<form id="locationForm">
							<div className="input-group mb-3 mr-1">
								<select
									onChange={this.selectChange}
									className="form-control form-control-sm"
									id="inputLocationSelect"
									data-type="location"
								>
									<option defaultValue="all" value="all">
										Location
									</option>
									{Object.entries(Locations).map(([key, value]) => (
										<option key={key} value={key} type="location">
											{value}
										</option>
									))}
								</select>
							</div>
						</form>
						<form id="metaForm">
							<div className="input-group mb-3 mr-1">
								<select
									onChange={this.selectChange}
									className="form-control form-control-sm"
									id="inputMetaSelect"
									data-type="meta"
								>
									<option defaultValue="all" value="all">
										Type
									</option>
									{Types.map((item, index) => (
										<option key={index} value={item} type="meta">
											{camelCaseBreaker(item)}
										</option>
									))}
								</select>
							</div>
						</form>
						<form id="statusForm">
							<div className="input-group mb-3 mr-1">
								<select
									onChange={this.selectChange}
									className="form-control form-control-sm"
									id="inputStatusSelect"
									data-type="status"
								>
									<option defaultValue="all" value="all">
										Status
									</option>
									{Object.entries(Status).map(([key, value]) => (
										<option key={key} value={key} type="status">
											{value}
										</option>
									))}
								</select>
							</div>
						</form>
					</div>
					<ul className="nav justify-content-end">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarDropdownMenuLink"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Quick Links
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								<li>
									<NavLink to="/view/all" className="dropdown-item" onClick={this.props.resetFilters}>
										All
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'/page/worksheet'}
										className="dropdown-item">
										Rundown Lists
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'/view/date/' + today}
										className="dropdown-item"
										onClick={this.props.resetFilters}
									>
										Today
									</NavLink>
								</li>
								<li>
									<a
										//to="/view/type/LiveStream"
										className="dropdown-item"
										onClick={()=>this.props.localFilter('meta', 'LiveStream')}
									>
										Live Streams
									</a>
								</li>
								<li>
									<NavLink
										to="/view/video"
										className="dropdown-item"
										onClick={this.props.resetFilters}
									>
										All Video
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<NavLink className={'nav-link ' + this.props.status} to="/admin" tabIndex="-1">
								Admin
							</NavLink>
						</li>
					</ul>
				</nav>
			</Fragment>
		);
	}
}

export default Header;
