import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { camelCaseBreaker } from '../helpers'
import filterData from '../filterData.json';

class SideNav extends React.Component {
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
			document.getElementById('inputLocationSelect').setAttribute('disabled','')
		}
		if (slug === 'date') {
			document.getElementById('inputDateSelect').setAttribute('disabled','')
		}
	}

	dateSelectChange = e => {
		this.setState({
			filterType: 'date',
			filterValue: e.target.value
		}, () => {
			let type = this.state.filterType;
			let value = this.state.filterValue
			
			if (value === 'all') {
				return
			} else {
				this.props.setFilterQueue(type, value)
			}
		});
		
	};

	locationSelectChange = e => {
		this.setState({
			filterType: 'location',
			filterValue: e.target.value
		}, () => {
			let type = this.state.filterType;
			let value = this.state.filterValue
			
			if (value === 'all') {
				return
			} else {
				this.props.setFilterQueue(type, value)
			}
		})
	}

	metaSelectChange = e => {
		this.setState({
			filterType: 'meta',
			filterValue: e.target.value
		}, () => {
			let type = this.state.filterType;
			let value = this.state.filterValue
			
			if (value === 'all') {
				return
			} else {
				this.props.setFilterQueue(type, value)
			}
		})
	}


	render() {
		const today = format(new Date(), 'YYYY-MM-DD');
		const dates = filterData.Dates;
		const locations = filterData.Locations;
		const types = filterData.Types;
		return (
			<nav className="nav sticky-top flex-column">
				<h3>Filters</h3>
				<form id="dateForm">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="inputDateSelect">
								Date
							</label>
						</div>
						<select onChange={this.dateSelectChange} className="custom-select" id="inputDateSelect">
							<option defaultValue="all">All</option>
							{dates.map((item, index) => (
								<option key={index} value={item} type='date'>
									{item}
								</option>
							))}
						</select>
					</div>
				</form>
				<form action="" id="locationForm">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="inputLocation">
								Venue
							</label>
						</div>
						<select onChange={this.locationSelectChange} className="custom-select" id="inputLocationSelect">
							<option defaultValue="all">All</option>
							{locations.map((item, index) => (
								<option key={index} value={item} type='location'>
									{item}
								</option>
							))}
						</select>
					</div>
				</form>
				<form action="" id="metaForm">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="inputMeta">
								Type
							</label>
						</div>
						<select onChange={this.metaSelectChange} className="custom-select" id="inputMetaSelect">
							<option defaultValue="all">All</option>
							{types.map((item, index) => (
								<option key={index} value={item} type='meta'>
									{camelCaseBreaker(item)}
								</option>
							))}
						</select>
					</div>
				</form>
				<hr />
				<h4>Quick Links</h4>
				<Link to='/view/all' className="btn btn-outline-primary btn-block" onClick={this.props.linkResets}>
					All
				</Link>
				<Link to={'/view/date/' + today} className="btn btn-outline-primary btn-block" onClick={this.props.linkResets}>
					Today
				</Link>
				<Link to="/view/type/LiveStream" className="btn btn-outline-primary btn-block" onClick={this.props.linkResets}>
					Live Streams
				</Link>
				<Link to="/view/video" className="btn btn-outline-primary btn-block" onClick={this.props.linkResets}>
					All Video
				</Link>
				<Link to="" className="btn btn-outline-primary btn-block" onClick={this.props.linkResets}>
					Completed
				</Link>
			</nav>
		);
	}
}

export default SideNav;
