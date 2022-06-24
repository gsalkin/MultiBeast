import React, { Fragment } from 'react';
import SessionListItem from './SessionListItem';
import Header from './Header';
import Session from './Session';
import ScrollToTop from './ScrollToTop';
import { getFilterOptions } from '../helpers';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedEventID: null,
			filterData: {
				dateFilter: null,
				locationFilter: null,
				metaFilter: null,
				statusFilter: null
			},
			sessions: []
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
		let status = response.status;
		let sessions;
		if (status >= 200 && status < 300) {
			sessions = response.json();
		}
		return sessions;
	};

	componentDidMount() {
		this.populateApp();
	}

	populateApp = async () => {
		const type = this.props.match.params.type;
		const param = this.props.match.params.param;
		let url = '';
		if (!param) {
			url = '/api/v1/' + type;
		} else {
			url = '/api/v1/' + type + '/' + param;
		}
		let body = await this.callApi(url);
		this.setState({
			filterData: {
				dateFilter: type === 'date' ? param : null,
				locationFilter: type === 'location' ? param : null,
				metaFilter: type === 'type' ? param : null
			},
			sessions: body
		})
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

	resetFilters = () => {
		this.setState(
			{
				filterData: {
					dateFilter: null,
					locationFilter: null,
					metaFilter: null,
					statusFilter: null
				}
			},
			() => {
				this.populateApp();
			}
		);
	};

	renderSession = id => {
		if (id) {
			return <Session key={id} id={id} unsetSessionID={this.unsetSessionID} reRenderApp={this.reRenderApp} />;
		} else {
			return (
				<div className="col-6">
					<h1>Select A Session</h1>
				</div>
			);
		}
	};

	localFilter = (type, data) => {
		let filterState = '';
		const { locationFilter, dateFilter, metaFilter, statusFilter } = this.state.filterData;
		if (type === 'date') {
			filterState = this.state.sessions.filter(session => session.ArtsVisionFork.SessionDate === data);
		}
		if (type === 'location') {
			filterState = this.state.sessions.filter(session => session.ArtsVisionFork.SessionLocation === data);
		}
		if (type === 'meta') {
			filterState = this.state.sessions.filter(session => session.AspenCoverageFork[data] === true);
		}
		if (type === 'status') {
			filterState = this.state.sessions.filter(session => session.AspenChecklistFork[data] === true);
		}
		this.setState({
			filterData: {
				dateFilter: type === 'date' ? data : dateFilter,
				locationFilter: type === 'location' ? data : locationFilter,
				metaFilter: type === 'meta' ? data : metaFilter,
				statusFilter: type === 'status' ? data : statusFilter
			},
			sessions: filterState
		});
	};

	render() {
		const { sessions, dateFilter, filterData: { locationFilter, metaFilter, statusFilter } } = this.state;
		const userName = sessionStorage.getItem('user_name');
		const filterOptions = sessions && getFilterOptions(sessions);
		return (
			<>
				<Header
					status="active"
					filterState={this.state.filterData}
					resetFilters={this.resetFilters}
					slug={this.props.match.params.type}
					localFilter={this.localFilter}
					filterOptions={filterOptions}
				/>
				<div className="container-fluid header-override">
					<div className="row">
						<div className="col-12 col-xl-6" id="sessionlistcontainer">
							<ScrollToTop />
							<p className="h4">
								{dateFilter && (
									<span>
										<span className="badge badge-info mr-1">{dateFilter}</span>
									</span>
								)}
								{locationFilter && (
									<span>
										<span className="badge badge-info mr-1">{locationFilter}</span>
									</span>
								)}
								{metaFilter && (
									<span>
										<span className="badge badge-secondary mr-1">
											{metaFilter}
										</span>
									</span>
								)}
								{statusFilter && (
									<span>
										<span className="badge badge-secondary mr-1">
											{statusFilter}
										</span>
									</span>
								)}
							</p>
							{sessions ? (
								<>
									{sessions.length > 0 ? sessions.map((session, idx) => (
										<>
											<SessionListItem
												key={idx}
												data={session}
												filter={this.localFilter}
												userName={userName}
												setSessionID={this.setSessionID}
											/>
										</>
									)) : (
										<div className="card">
											<div className="card-body">
												<h1>No Sessions Found</h1>
											</div>
										</div>
									)}
								</>
							) : (
								<div className="card">
									<div className="card-body">
										<h1>No Sessions Found</h1>
									</div>
								</div>
							)}
						</div>
						{this.state.selectedEventID && this.renderSession(this.state.selectedEventID)}
					</div>
				</div>
			</>
		);
	}
}

export default App;
