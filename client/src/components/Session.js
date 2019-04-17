import React, { Fragment } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Header from './Header';
import SessionCoverage from './SessionCoverage';
import SessionWorkflow from './SessionWorkflow';
import { convertTimes, stringifySpeakers, dateClassHelper } from '../helpers';

class Session extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		this.callApi('/api/view/session/' + ID).then(json => {
			this.setState({
				ArtsVisionFork: json[0].ArtsVisionFork,
				AspenChecklistFork: json[0].AspenChecklistFork,
				AspenCoverageFork: json[0].AspenCoverageFork
			});
		});
	};

	callApi = async url => {
		let response = await fetch(url);
		let status = await response.status;
		if (status >= 200 && status < 300) {
			return await response.json();
		} else {
			throw Error(await response.statusText);
		}
	};

	updateSession = (data) => {
		fetch('/api/update/session/' + this.state.ArtsVisionFork.EventID, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			return response.json();
		})
		.then( json => {
			console.log(json);
			
			this.setState({
				ArtsVisionFork: json[0].ArtsVisionFork,
				AspenChecklistFork: json[0].AspenChecklistFork,
				AspenCoverageFork: json[0].AspenCoverageFork
			})
		})
	};

	render() {
		const {
			SessionName,
			SessionDate,
			SessionLocation,
			SessionSpeakers,
			StartTime,
			EndTime,
			ArtsVisionNotes,
			EventID
		} = this.state.ArtsVisionFork;
		return (
			<div className="container-fluid">
				<Header />
				<div className="row">
					<div className="col-3 offset-1">
					<Link className="btn btn-outline-dark" to={'/view/all/#event-' + EventID}>← Back</Link>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h2>
							<span className="badge badge-success">{EventID}</span> {SessionName}
							</h2>
							<h4>
							<span className={dateClassHelper(SessionDate)}>{SessionDate}</span> <span className="badge badge-info">{convertTimes(StartTime)} - {convertTimes(EndTime)}</span> <span className="badge badge-warning">{SessionLocation}</span>
							</h4>
							{SessionSpeakers && (
								<Fragment>
									<p className="lead">Speakers: {stringifySpeakers(SessionSpeakers)}</p>
								</Fragment>
							)}
							<div className="bg-light">
								<p className="p-3 border">{ArtsVisionNotes}</p>
							</div>
							<hr />
							<h4>Coverage</h4>
							<SessionCoverage
								details={this.state.AspenCoverageFork}
								updateSession={this.updateSession}
							/>
							<hr />
							<SessionWorkflow
								details={this.state.AspenChecklistFork}
								updateSession={this.updateSession}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Session;
