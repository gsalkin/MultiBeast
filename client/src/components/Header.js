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

	componentDidMount() {
		const slug = this.props.slug;
		if (slug === 'location') {
			document.getElementById('inputLocationSelect').setAttribute('disabled', '');
		}
		if (slug === 'date') {
			document.getElementById('inputDateSelect').setAttribute('disabled', '');
		}
	}

	dateSelectChange = e => {
		this.setState(
			{
				filterType: 'date',
				filterValue: e.target.value
			},
			() => {
				let type = this.state.filterType;
				let value = this.state.filterValue;

				if (value === 'all') {
					return;
				} else {
					this.props.setFilterQueue(type, value);
				}
			}
		);
	};

	locationSelectChange = e => {
		this.setState(
			{
				filterType: 'location',
				filterValue: e.target.value
			},
			() => {
				let type = this.state.filterType;
				let value = this.state.filterValue;

				if (value === 'all') {
					return;
				} else {
					this.props.setFilterQueue(type, value);
				}
			}
		);
	};

	metaSelectChange = e => {
		this.setState(
			{
				filterType: 'meta',
				filterValue: e.target.value
			},
			() => {
				let type = this.state.filterType;
				let value = this.state.filterValue;

				if (value === 'all') {
					return;
				} else {
					this.props.setFilterQueue(type, value);
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
		const { Dates, Locations, Types } = filterData
		return (
			<Fragment>
				<nav className={'navbar navbar-light ' + this.headerDisplayController() + ' bg-light'}>
					<NavLink className="navbar-brand" to="/view/all" onClick={this.props.filter}>
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast
					</NavLink>
					<div className="form-inline">
						<form id="dateForm">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<label className="input-group-text" htmlFor="inputDateSelect">
										Date
									</label>
								</div>
								<select onChange={this.dateSelectChange} className="custom-select" id="inputDateSelect">
									<option defaultValue="all">All</option>
									{Dates.map((item, index) => (
										<option key={index} value={item} type="date">
											{item}
										</option>
									))}
								</select>
							</div>
						</form>
						<form id="locationForm">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<label className="input-group-text" htmlFor="inputLocation">
										Venue
									</label>
								</div>
								<select
									onChange={this.locationSelectChange}
									className="custom-select"
									id="inputLocationSelect"
								>
									<option defaultValue="all">All</option>
									{Object.entries(Locations).map(([key, value]) =>(
										<option key={key} value={key} type="location">
											{value}
										</option>
									))}
								</select>
							</div>
						</form>
						<form id="metaForm">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<label className="input-group-text" htmlFor="inputMeta">
										Type
									</label>
								</div>
								<select onChange={this.metaSelectChange} className="custom-select" id="inputMetaSelect">
									<option defaultValue="all">All</option>
									{Types.map((item, index) => (
										<option key={index} value={item} type="meta">
											{camelCaseBreaker(item)}
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
									<NavLink to="/view/all" className="dropdown-item" onClick={this.props.linkResets}>
										All
									</NavLink>
								</li>
								<li>
									<NavLink
										onClick={this.props.linkResets}
										to="/view/season/SH%202018"
										className="dropdown-item"
									>
										Aspen Ideas Health
									</NavLink>
								</li>
								<li>
									<NavLink
										onClick={this.props.linkResets}
										to="/view/season/AIF%202018"
										className="dropdown-item"
									>
										Aspen Ideas Festival
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'/view/date/' + today}
										className="dropdown-item"
										onClick={this.props.linkResets}
									>
										Today
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/view/type/LiveStream"
										className="dropdown-item"
										onClick={this.props.linkResets}
									>
										Live Streams
									</NavLink>
								</li>
								<li>
									<NavLink to="/view/video" className="dropdown-item" onClick={this.props.linkResets}>
										All Video
									</NavLink>
								</li>
								{/* <li>
									<NavLink
										to="/view/type/Complete"
										className="dropdown-item"
										onClick={this.props.linkResets}
									>
										Completed
									</NavLink>
								</li> */}
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
