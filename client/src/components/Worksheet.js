import React from 'react';
import { Link } from 'react-router-dom';
import filterData from '../filterData';

class Worksheet extends React.Component {
	render() {
		const { Dates, Locations } = filterData;
		return (
			<div classNameName="container-fluid">
				<nav classNameName="navbar navbar-light">
					<Link className="navbar-brand" to="/view/all">
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast
					</Link>
				</nav>
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="list-group">
							{Object.entries(Dates).map(([key, value]) => (
								<Link
									className="list-group-item list-group-item-action"
									key={key}
									to={'/view/date/' + key}
								>
									Rundown for {value}
								</Link>
							))}
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="list-group">
							{Object.entries(Locations).map(([key, value]) => (
								<Link
									className="list-group-item list-group-item-action"
									key={key}
									to={'/view/location/' + key}
								>
									Rundown for {value}
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
