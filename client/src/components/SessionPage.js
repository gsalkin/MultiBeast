import React, { Fragment } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import SessionCoverage from './SessionCoverage';
import SessionWorkflow from './SessionWorkflow';
import * as Helpers from '../helpers';

class SessionPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: sessionStorage.getItem('user_name'),
			ArtsVisionFork: {},
			AspenChecklistFork: {},
			AspenCoverageFork: {}
		};
	}

	componentDidMount() {
		let sessionID = this.props.match.params.sessionID;
		this.setSessionState(sessionID);
	}

	setSessionState = ID => {
		this.callApi('/api/v1/session/' + ID).then(json => {
			this.setState({
				ArtsVisionFork: json[0].ArtsVisionFork,
				AspenChecklistFork: json[0].AspenChecklistFork,
				AspenCoverageFork: json[0].AspenCoverageFork
			});
		});
	};

	callApi = async url => {
		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
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

	updateSession = data => {
		fetch('/api/v1/update/session/' + this.state.ArtsVisionFork.EventID, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				return response.json();
			})
			.then(json => {
				this.setState({
					ArtsVisionFork: json[0].ArtsVisionFork,
					AspenChecklistFork: json[0].AspenChecklistFork,
					AspenCoverageFork: json[0].AspenCoverageFork
				});
			});
	};

	render() {
		const { ArtsVisionFork, AspenCoverageFork, AspenChecklistFork } = this.state;
		const {
			SessionName,
			SessionDate,
			SessionLocation,
			SessionTrack,
			SessionFest,
			SessionSpeakers,
			StartTime,
			EndTime,
			ArtsVisionNotes,
			EventID,
			Status
		} = ArtsVisionFork;
		const seasonClass = function() {
			if (Helpers.seasonMarker(SessionFest) === 'Aspen Ideas Health') {
				return 'purple__aspen';
			} else {
				return 'brightblue__aspen';
			}
		};
		return (
			<div className="container-fluid">
				<nav className="navbar navbar-light">
					<Link className="navbar-brand" to="/view/all" onClick={this.props.filter}>
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast
					</Link>
				</nav>
				<div className="container">
					<h2>
						<Link className="btn btn-outline-dark" to={'/view/all/#event-' + EventID}>
							← Back
						</Link>
						<span className="ml-2">{SessionName}</span>
					</h2>
					<h4>
						<span className="badge badge-success">{EventID}</span>{' '}
						<span className={'badge ' + seasonClass()}>{Helpers.seasonMarker(SessionFest)}</span>{' '}
						<span className={Helpers.dateClassHelper(SessionDate)}>{SessionDate}</span>{' '}
						<span className="badge badge-info">
							{Helpers.convertTimes(StartTime)} - {Helpers.convertTimes(EndTime)}
						</span>{' '}
						<span className="badge badge-warning">{SessionLocation}</span>{' '}
						{Status === 'Cancelled' && <span className="badge badge-warning">{Status}</span>}
					</h4>
					{SessionSpeakers && (
						<Fragment>
							<p className="lead">Speakers: {Helpers.stringifySpeakers(SessionSpeakers)}</p>
						</Fragment>
					)}
					<div className="bg-light px-2">
						<small>{ArtsVisionNotes}</small>
					</div>
					<hr />
					<div className="card">
						<h5 className="card-header text-primary">
							<a data-toggle="collapse" href="#coveragePlanForm" aria-expanded="true" className="d-block">
								Coverage &nbsp;
								<i className="fa fa-chevron-down pull-right" />
							</a>
						</h5>
						<SessionCoverage
							details={AspenCoverageFork}
							updateSession={this.updateSession}
							user={this.state.user}
						/>
					</div>
					<hr />
					<div className="card">
						<h5 className="card-header text-primary">
							<a
								data-toggle="collapse"
								href="#workflowContainer"
								aria-expanded="true"
								className="d-block"
							>
								Workflow &nbsp;
								<i className="fa fa-chevron-down pull-right" />
							</a>
						</h5>
						<SessionWorkflow
							details={AspenChecklistFork}
							updateSession={this.updateSession}
							user={this.state.user}
						/>
					</div>
				</div>
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}
}

export default SessionPage;
