import React from 'react';
import { format } from 'date-fns';
import configData from '../configData.json';

class SideNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateFilterValue: false,
			locationFilterValue: false,
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
			dateFilterValue: e.target.value
		}, () => {
			const location = this.state.locationFilterValue;
			const date = this.state.dateFilterValue;
			if (location) {
				this.props.filterAll(location, date)
			} else {
				this.props.filterDate(date);
			}
		});
		
	};

	locationSelectChange = e => {
		this.setState({
			locationFilterValue: e.target.value
		}, () => {
			const date = this.state.dateFilterValue;
			const location = this.state.locationFilterValue;
			if (date) {
				this.props.filterAll(location, date)
			} else {
				this.props.filterLocation(location);
			}
		})
	}


	render() {
		const today = format(new Date(), 'YYYY-MM-DD');
		const dates = configData.Dates;
		const locations = configData.Locations;
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
							<option defaultValue="all">Choose...</option>
							{dates.map((item, index) => (
								<option key={index} value={item} >
									{item}
								</option>
							))}
						</select>
					</div>
				</form>
				<form action="">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="inputLocation">
								Venue
							</label>
						</div>
						<select onChange={this.locationSelectChange} className="custom-select" id="inputLocationSelect">
							<option defaultValue="all">Choose...</option>
							{locations.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
				</form>
				<hr />
				<h4>Quick Links</h4>
				<a href={'/view/all'} className="btn btn-outline-primary btn-block">
					All
				</a>
				<a href={'/view/date/' + today} className="btn btn-outline-primary btn-block">
					Today
				</a>
				<a href="/view/type/LiveStream" className="btn btn-outline-primary btn-block">
					Live Streams
				</a>
				<a href="/view/video" className="btn btn-outline-primary btn-block">
					All Video
				</a>
				<a href="" className="btn btn-outline-primary btn-block">
					Completed
				</a>
			</nav>
		);
	}
}

export default SideNav;
