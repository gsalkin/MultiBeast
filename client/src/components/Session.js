import React from 'react';
import SessionCoverage from './SessionCoverage';
import SessionWorkflow from './SessionWorkflow';
import { convertTimes, stringifySpeakers, dateClassHelper } from '../helpers';

class SessionSPA extends React.Component {
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
		let sessionID = this.props.id;
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
		let status = response.status;
		let session;
		if (status >= 200 && status < 300) {
			session = response.json();
		}
		return session;
	};

	updateSession = data => {
		fetch('/api/v1/update/session/' + this.props.id, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (response.status === 200) {
					document.getElementById('inputCoverageNotes').value = '';
				}
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
		const { AspenCoverageFork, ArtsVisionFork, AspenChecklistFork } = this.state;
		const {
			SessionName,
			SessionDate,
			SessionLocation,
			SessionSpeakers,
			StartTime,
			EndTime,
			ArtsVisionNotes,
			EventID
		} = ArtsVisionFork;

		return (
			<div className="col-12 col-md-6 position-fixed half-page-fixed" id="sessiondetailcontainer">
				<h3>
					<a className="btn btn-outline-dark" onClick={this.props.unsetSessionID} href={'#' + EventID}>
						← Back
					</a>
					&nbsp;
					{SessionName}
					&nbsp;
				</h3>
				<h5>
					<span className={dateClassHelper(SessionDate)}>{SessionDate}</span>{' '}
					<span className="badge badge-info">
						{convertTimes(StartTime)} - {convertTimes(EndTime)}
					</span>{' '}
					<span className="badge badge-warning">{SessionLocation}</span>{' '}
					<span className="badge badge-success">#{EventID}</span>
				</h5>
				{SessionSpeakers && <p className="lead">Speakers: {stringifySpeakers(SessionSpeakers)}</p>}
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
						<a data-toggle="collapse" href="#workflowContainer" aria-expanded="true" className="d-block">
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
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}
}

export default SessionSPA;
