import React, { Fragment } from 'react';
import SessionListItem from './SessionListItem';
import Header from './Header';
import SideNav from './SideNav';
import { dateClassHelper } from '../helpers.js';

class App extends React.Component {
	state = {
		userName: this.props.userName,
		filterMeta: {
			dateFilter: false,
			locationFilter: false
		},
		sessions: {}
	};

	callApi = async url => {
		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			}
		});
		let status = await response.status;
		if (status >= 200 && status < 300) {
			return await response.json();
		} else {
			throw Error(await response.statusText);
		}
	};

	componentDidMount() {
		const type = this.props.match.params.type;
		const param = this.props.match.params.param;
		let url = '';
		if (!param) {
			url = '/api/v1/' + type;
		} else {
			url = '/api/v1/' + type + '/' + param;
		}
		this.callApi(url).then(body => {
			this.setState({
				sessions: body
			});
		});
	}

	filterAll = (location, date) => {
		const param = this.props.match.params.param;
		const type = this.props.match.params.type;
		let url = '/api/v1/';
		if (type === 'video') {
			url = url + 'video/';
		}
		if (!param) {
			url = url + 'location/' + encodeURIComponent(location) + '/date/' + date;
		} else if (param) {
			url = url + 'type/' + param + '/location/' + encodeURIComponent(location) + '/date/' + date;
		}
		this.callApi(url).then(body => {
			this.setState({
				filterMeta: {
					dateFilter: 'date: ' + date,
					locationFilter: 'location: ' + location
				},
				sessions: body
			});
		});
	};

	filterDate = date => {
		const type = this.props.match.params.type;
		const param = this.props.match.params.param;
		console.log(param);

		if (!param && type === 'all') {
			let url = '/api/v1/date/' + date;
			//console.log(url);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						dateFilter: 'date: ' + date
					},
					sessions: body
				});
			});
		}

		if (!param && type === 'video') {
			let url = '/api/v1/video/date/' + date;
			//console.log(url);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						dateFilter: 'date: ' + date
					},
					sessions: body
				});
			});
		}
		// Filter Location by Date/Date by Location uses the same API route
		else if (type === 'location') {
			let url = '/api/v1/location/' + encodeURIComponent(param) + '/date/' + date;
			//console.log(url);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						dateFilter: 'date: ' + date
					},
					sessions: body
				});
			});
		} else {
			let url = '/api/v1/type/' + param + '/date/' + date;
			//console.log(url);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						dateFilter: 'date: ' + date
					},
					sessions: body
				});
			});
		}
	};

	filterLocation = location => {
		let type = this.props.match.params.type;
		let param = this.props.match.params.param;
		if (type === 'all') {
			let url = '/api/v1/location/' + encodeURIComponent(location);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						locationFilter: 'location: ' + location
					},
					sessions: body
				});
			});
		}

		if (type === 'video') {
			let url = '/api/v1/video/location/' + encodeURIComponent(location);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						dateFilter: 'location: ' + location
					},
					sessions: body
				});
			});
		}

		// Filter Location by Date/Date by Location uses the same API route
		else if (type === 'date') {
			let url = '/api/v1/location/' + encodeURIComponent(location) + '/date/' + param;
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						locationFilter: 'location: ' + location
					},
					sessions: body
				});
			});
		} else {
			let url = '/api/v1/type/' + type + '/' + param + '/location/' + encodeURIComponent(location);
			this.callApi(url).then(body => {
				this.setState({
					filterMeta: {
						locationFilter: 'location: ' + location
					},
					sessions: body
				});
			});
		}
	};

	renderResults() {
		if (this.state.sessions.length == 0) {
			return (
				<div className="card">
					<div className="card-body">
						<h1>No Sessions Found</h1>
					</div>
				</div>
			);
		} else {
			return Object.keys(this.state.sessions).map(key => (
				<Fragment key={key}>
					<SessionListItem data={this.state.sessions[key]} />
					<br />
				</Fragment>
			));
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<Header status="active" />
				<div className="row">
					<div className="col-2">
						<SideNav
							filterDate={this.filterDate}
							filterLocation={this.filterLocation}
							filterType={this.filterType}
							filterAll={this.filterAll}
							slug={this.props.match.params.type}
						/>
					</div>
					<div className="col-10">
						<p className="h3">
							{this.props.match.params.param && (
								<span className={dateClassHelper(this.props.match.params.param)}>
									{this.props.match.params.type + ': ' + this.props.match.params.param}
								</span>
							)}
							&nbsp;
							{this.state.filterMeta.dateFilter && (
								<span className="badge badge-info">{this.state.filterMeta.dateFilter}</span>
							)}
							&nbsp;
							{this.state.filterMeta.locationFilter && (
								<span className="badge badge-info">{this.state.filterMeta.locationFilter}</span>
							)}
						</p>
						{this.renderResults()}
						{/* {Object.keys(this.state.sessions).map(key => (
							<Fragment key={key}>
								<SessionListItem data={this.state.sessions[key]} />
								<br />
							</Fragment>
						))} */}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
