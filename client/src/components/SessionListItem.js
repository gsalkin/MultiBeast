import React from 'react';
import { stringifySpeakers, convertTimes, classHelper, dateClassHelper } from '../helpers';

class SessionListItem extends React.Component {
	render() {
		const {
			ArtsVisionFork: {
				SessionName,
				SessionDate,
				SessionLocation,
				StartTime,
				EndTime,
				EventID,
				SessionSpeakers,
			},
			AspenChecklistFork: {
				Status
			}
		} = this.props.data;

		return (
			<div>
				<a href={'/session/' + EventID} className="list-group-item list-group-item-action" id={'event-'+ EventID} data-session-label={SessionName}>
					<div className="d-flex w-100 justify-content-between">
						<h4 className="mb-1">
							<small className="text-muted">
								<span className={dateClassHelper(SessionDate)}>{SessionDate}</span> <span className="badge badge-pill badge-info">{convertTimes(StartTime)} to {convertTimes(EndTime)}</span>
							</small>
							<br />
							{SessionName}
						</h4>
						<h5>
							<strong>#{EventID}</strong>
							<br/>
							<span className={'badge ' + classHelper(Status)}>{Status}</span>
						</h5>
						{/*  */}
					</div>
					<p className="mb-1">{SessionLocation}</p>
					<small>{stringifySpeakers(SessionSpeakers)}</small>
				</a>
			</div>
		);
	}
}

export default SessionListItem;
