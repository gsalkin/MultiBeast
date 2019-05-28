import React, { Fragment } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import SessionCoverage from './SessionCoverage';
import SessionWorkflow from './SessionWorkflow';
import { convertTimes, stringifySpeakers, dateClassHelper } from '../helpers';

class SessionSPA extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: sessionStorage.getItem('user_name')
			// ArtsVisionFork: {},
			// AspenChecklistFork: {},
			// AspenCoverageFork: {}
		};
	}

	// componentDidMount() {
	// 	let sessionID = this.props.id;
	// 	this.setSessionState(sessionID);
	// }

	// setSessionState = ID => {
	// 	this.callApi('/api/v1/session/' + ID).then(json => {
	// 		this.setState({
	// 			ArtsVisionFork: json[0].ArtsVisionFork,
	// 			AspenChecklistFork: json[0].AspenChecklistFork,
	// 			AspenCoverageFork: json[0].AspenCoverageFork
	// 		});
	// 	});
	// };

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
		fetch('/api/v1/update/session/' + this.props.id, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			},
			body: JSON.stringify(data)
		}).then(response => {
            console.log(response,json());
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
        const { AspenCoverageFork, ArtsVisionFork, AspenChecklistFork } = this.props.data;
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
			<div className="col-6 position-fixed half-page-fixed">
				<h2>
					<span className="badge badge-success">{EventID}</span> {SessionName}
				</h2>
				<h4>
					<span className={dateClassHelper(SessionDate)}>{SessionDate}</span>{' '}
					<span className="badge badge-info">
						{convertTimes(StartTime)} - {convertTimes(EndTime)}
					</span>{' '}
					<span className="badge badge-warning">{SessionLocation}</span>
				</h4>
				{SessionSpeakers && <p className="lead">Speakers: {stringifySpeakers(SessionSpeakers)}</p>}
				<div className="bg-light">
					<p className="p-3 border">{ArtsVisionNotes}</p>
				</div>
				<hr />
				<h4>Coverage</h4>
				<SessionCoverage
					details={AspenCoverageFork}
					updateSession={this.updateSession}
					user={this.state.user}
				/>
				<hr />
				<SessionWorkflow
					details={AspenChecklistFork}
					updateSession={this.updateSession}
					user={this.state.user}
				/>
			</div>
		);
	}
}

export default SessionSPA;
