import $ from 'jquery';
import React, { Fragment } from 'react';
import SessionListItem from './SessionListItem';
import Header from './Header';
import SideNav from './SideNav';
import SessionSPA from './SessionSPA';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedEventID: null,
			filterData: {
				dateFilter: null,
				locationFilter: null,
				metaFilter: null
			},
			sessions: {}
		};
	}

	callApi = async url => {
		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			}
		})
			.then(response => {
				let status = response.status;
				if (status >= 200 && status < 300) {
					return response.json();
				}
			})
			.catch(error => {
				console.log(error);
			});
		return response;
	};

	componentDidMount() {
		this.populateApp();
	}

	populateApp = () => {
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
				filterData: {
					dateFilter: type === 'date' ? param : null,
					locationFilter: type === 'location' ? param : null,
					metaFilter: type === 'type' ? param : null
				},
				sessions: body
			});
		});
	};

	reRenderApp = () => {
		const { locationFilter, dateFilter, metaFilter } = this.state.filterData;
		this.filterData(dateFilter, locationFilter, metaFilter);
	};

	setSessionID = id => {
		this.setState({
			selectedEventID: id
		});
	};

	unsetSessionID = () => {
		this.setState({
			selectedEventID: null
		});
	};

	resetOnHardLink = () => {
		this.setState(
			{
				filterData: {
					dateFilter: null,
					locationFilter: null,
					metaFilter: null
				}
			},
			() => {
				this.populateApp();
			}
		);
	};

	filterDate = date => {
		let url = '/api/v1/date/' + date;
		this.callApi(url).then(body => {
			this.setState({
				sessions: body
			});
		});
	};

	filterLocation = location => {
		let url = '/api/v1/location/' + location;
		this.callApi(url).then(body => {
			this.setState({
				filterData: {
					locationFilter: location
				},
				sessions: body
			});
		});
	};

	filterMeta = meta => {
		let url = '/api/v1/type/' + meta;
		this.callApi(url).then(body => {
			this.setState({
				filterData: {
					metaFilter: meta
				},
				sessions: body
			});
		});
	};

	filterData = (date, location, meta) => {
		if (!date && !location && !meta) {
			this.props.history.push('/view/all');
			this.populateApp();
			return;
		}
		if (date && !location && !meta) {
			this.filterDate(date);
			return;
		}
		if (date && location && !meta) {
			let url = '/api/v1/location/' + encodeURIComponent(location) + '/date/' + date;
			this.callApi(url).then(body => {
				this.setState({
					sessions: body
				});
			});
			return;
		}
		if (date && !location && meta) {
			let url = '/api/v1/type/' + meta + '/date/' + date;
			this.callApi(url).then(body => {
				this.setState({
					sessions: body
				});
			});
			return;
		}
		if (!date && location && !meta) {
			this.filterLocation(location);
			return;
		}
		if (!date && location && meta) {
			let url = '/api/v1/type/' + meta + '/location/' + encodeURIComponent(location);
			this.callApi(url).then(body => {
				this.setState({
					sessions: body
				});
			});
			return;
		}
		if (!date && !location && meta) {
			this.filterMeta(meta);
			return;
		}
		if (date && location && meta) {
			let url = '/api/v1/type' + meta + '/location/' + encodeURIComponent(location) + '/date/' + date;
			this.callApi(url).then(body => {
				this.setState({
					sessions: body
				});
			});
			return;
		}
	};

	setFilterQueue = (type, data) => {
		const { locationFilter, dateFilter, metaFilter } = this.state.filterData;
		this.setState(
			{
				filterData: {
					dateFilter: type === 'date' ? data : dateFilter,
					locationFilter: type === 'location' ? data : locationFilter,
					metaFilter: type === 'meta' ? data : metaFilter
				}
			},
			() => {
				let { locationFilter, dateFilter, metaFilter } = this.state.filterData;
				this.filterData(dateFilter, locationFilter, metaFilter);
			}
		);
	};

	unsetFilterQueue = e => {
		const filterType = e.target.value;
		const form = document.getElementById(filterType + 'Form');
		form.reset();
		const { locationFilter, dateFilter, metaFilter } = this.state.filterData;
		this.setState(
			{
				filterData: {
					dateFilter: filterType === 'date' ? null : dateFilter,
					locationFilter: filterType === 'location' ? null : locationFilter,
					metaFilter: filterType === 'meta' ? null : metaFilter
				}
			},
			() => {
				let { locationFilter, dateFilter, metaFilter } = this.state.filterData;
				this.filterData(dateFilter, locationFilter, metaFilter);
			}
		);
	};

	renderResults() {
		const userName = sessionStorage.getItem('user_name');
		if (!this.state.sessions) {
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
					<SessionListItem
						data={this.state.sessions[key]}
						filter={this.resetOnHardLink}
						userName={userName}
						setSessionID={this.setSessionID}
					/>
					<br />
				</Fragment>
			));
		}
	}

	renderSession = id => {
		if (id) {
			return <SessionSPA key={id} id={id} unsetSessionID={this.unsetSessionID} reRenderApp={this.reRenderApp} />;
		} else {
			return (
				<div className="col-6">
					<h1>Select A Session</h1>
				</div>
			);
		}
	};

	render() {
		return (
			<>
				<Header
					status="active"
					filter={this.resetOnHardLink}
					setFilterQueue={this.setFilterQueue}
					slug={this.props.match.params.type}
					linkResets={this.resetOnHardLink}
				/>
				<div className="container-fluid header-override">
					<div className="row">
						<div className="col-12 col-md-6" id="sessionlistcontainer">
							<p className="h4">
								{this.state.filterData.dateFilter && (
									<span>
										<span className="badge badge-info">
											{this.state.filterData.dateFilter}
											&nbsp;
											<button
												type="button"
												className="close"
												aria-label="Close"
												value="date"
												onClick={this.unsetFilterQueue}
											>
												✖️
											</button>
										</span>{' '}
									</span>
								)}
								{this.state.filterData.locationFilter && (
									<span>
										<span className="badge badge-info">
											{this.state.filterData.locationFilter}
											&nbsp;
											<button
												type="button"
												className="close"
												aria-label="Close"
												value="location"
												onClick={this.unsetFilterQueue}
											>
												✖️
											</button>
										</span>{' '}
									</span>
								)}
								{this.state.filterData.metaFilter && (
									<span>
										<span className="badge badge-secondary">
											{this.state.filterData.metaFilter}
											&nbsp;
											<button
												type="button"
												className="close"
												aria-label="Close"
												value="meta"
												onClick={this.unsetFilterQueue}
											>
												✖️
											</button>
										</span>{' '}
									</span>
								)}
							</p>
							{this.renderResults()}
						</div>
						{this.renderSession(this.state.selectedEventID)}
					</div>
				</div>
			</>
		);
	}
}

export default App;
