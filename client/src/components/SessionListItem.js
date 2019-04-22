import React from 'react';
import { stringifySpeakers, convertTimes, classHelper, dateClassHelper } from '../helpers';

class SessionListItem extends React.Component {
	render() {
		const {
			ArtsVisionFork: { SessionName, SessionDate, SessionLocation, StartTime, EndTime, EventID, SessionSpeakers },
			AspenChecklistFork: { Status },
			AspenCoverageFork: { VideoVenue, VideoRover, LiveStream, QuickClip, Audio, Photo, Transcript, Restriction }
		} = this.props.data;

		return (
			<div
				className="list-group-item list-group-item-action"
				id={'event-' + EventID}
				data-session-label={SessionName}
			>
				<div className="d-flex w-100 justify-content-between">
					<h4 className="mb-1">
						<small className="text-muted">
							<a className={dateClassHelper(SessionDate)} href={'/view/date/' + SessionDate}>
								{SessionDate}
							</a>{' '}
							<span className="badge badge-pill badge-info">
								{convertTimes(StartTime)} to {convertTimes(EndTime)}
							</span>
						</small>
						<br />
						<a href={'/session/' + EventID} className="text-dark">
							{SessionName}
						</a>
					</h4>
					<h5>
						<strong>#{EventID}</strong>
						<br />
						<span className={'badge ' + classHelper(Status)}>{Status}</span>
					</h5>
				</div>
				<a href={'/view/location/' + encodeURIComponent(SessionLocation)} className="mb-1">
					{SessionLocation}
				</a>
				<br />
				<small>{stringifySpeakers(SessionSpeakers)}</small>
				<hr />
				{VideoVenue && (
					<a href={'/view/all/VideoVenue'} className="badge badge-pill badge-dark">Recording ✓</a>
				)}
				&nbsp;
				{VideoRover && (
					<a href={'/view/all/VideoRover'} className="badge badge-pill badge-dark">Send Rover ✓</a>
				)}
				&nbsp;
				{LiveStream && (
					<a href={'/view/all/LiveStream'} className="badge badge-pill badge-dark">Livestream ✓</a>
				)}
				&nbsp;
				{QuickClip && (
					<a href={'/view/all/QuickClip'} className="badge badge-pill badge-dark">QuickClips ✓</a>
				)}
				&nbsp;
				{Photo && (
					<a href={'/view/all/Photo'} className="badge badge-pill badge-dark">Photo Priority ✓</a>
				)}
				&nbsp;
				{Audio && (
					<a href={'/view/all/Audio'} className="badge badge-pill badge-dark">Audio Priority ✓</a>
				)}
				&nbsp;
				{Transcript && (
					<a href={'/view/all/Transcript'} className="badge badge-pill badge-dark">Transcript Priority ✓</a>
				)}
				&nbsp;
				{Restriction && (
					<a href={'/view/all/Restriction'} className="badge badge-pill badge-danger">Restriction *</a>
				)}
			</div>
		);
	}
}

export default SessionListItem;
