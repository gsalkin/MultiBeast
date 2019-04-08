import React from 'react';
import { stringifySpeakers, convertTimes, classHelper } from '../helpers';

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
				Meta: { Status }
			}
		} = this.props.data;

		return (
			<div>
				<a href={'/session/' + EventID} className="list-group-item list-group-item-action" id={'event-'+ EventID} data-session-label={SessionName}>
					<div className="d-flex w-100 justify-content-between">
						<h4 className="mb-1">
							<small className="text-muted">
								{SessionDate} | {convertTimes(StartTime)} to {convertTimes(EndTime)}
							</small>
							<br />
							{SessionName}
						</h4>
						<p>
							<strong>#{EventID}</strong>
							<br />
							<span className={classHelper(Status)}>{Status}</span>
						</p>
					</div>
					<p className="mb-1">{SessionLocation}</p>
					<small>{stringifySpeakers(SessionSpeakers)}</small>
				</a>
			</div>
		);
	}
}

export default SessionListItem;
