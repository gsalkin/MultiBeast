import React from 'react';
import { Link } from 'react-router-dom';
import filterData from '../filterData';

class Worksheet extends React.Component {
	render() {
		const { Dates, Locations, Types } = filterData;
		return (
			<div classNameName="container-fluid">
				<nav classNameName="navbar navbar-light">
					<Link className="navbar-brand" to="/view/all">
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast
					</Link>
				</nav>
				<div className="row">
					<div className="col-12 col-md-4 px-4">
						<h4>Dates</h4>
						<div className="list-group">
							{Dates.map((date, key) => (
								<Link
									className="list-group-item list-group-item-action"
									key={key}
									to={'/view/date/' + encodeURIComponent(date)}
								>
									Rundown for {date}
								</Link>
							))}
						</div>
					</div>
					<div className="col-12 col-md-4 px-4">
						<h4>Locations</h4>
						<div className="list-group">
							{Locations.map((location, key) => (
								<Link
									className="list-group-item list-group-item-action"
									key={key}
									to={'/view/location/' + encodeURIComponent(location)}
								>
									Rundown for {location}
								</Link>
							))}
						</div>
					</div>
					<div className="col-12 col-md-4 px-4">
						<h4>Coverage</h4>
						<div className="list-group">
							{Types.map((item, index) => (
								<Link
									className="list-group-item list-group-item-action"
									key={index}
									to={'/view/type/' + encodeURIComponent(item)}
								>
									Rundown for {item}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Worksheet;
