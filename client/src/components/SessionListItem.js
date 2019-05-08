import React from 'react';
import * as Helpers from '../helpers';

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
				SessionFest
			},
			AspenChecklistFork: { Status },
			AspenCoverageFork: { VideoVenue, VideoRover, LiveStream, QuickClip, Audio, Photo, Transcript, Restriction }
		} = this.props.data;

		const seasonClass = function() {
			if (Helpers.seasonMarker(SessionFest) === 'Aspen Ideas Health') {
				return 'purple__aspen';
			} else {
				return 'brightblue__aspen';
			}
		};
		return (
			<div className="card" id={'event-' + EventID} data-session-label={SessionName}>
				<div className="card-header">
					<a href={'/view/season/' + encodeURIComponent(SessionFest)} className={'badge ' + seasonClass()}>
						{Helpers.seasonMarker(SessionFest)}
					</a>
					&nbsp;
					<a className={Helpers.dateClassHelper(SessionDate)} href={'/view/date/' + SessionDate}>
						{SessionDate}
					</a>
					&nbsp;
					<span className="badge border border-primary rounded-lg">
						{Helpers.convertTimes(StartTime)} to {Helpers.convertTimes(EndTime)}
					</span>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-10">
							<h4>
								<a href={'/session/' + EventID} className="text-dark">
									{SessionName}
								</a>
							</h4>
						</div>
						<div className="col-2">
							<h5 className="text-right">
								<strong className="align-middle">#{EventID}</strong>
								&nbsp;
								<span className={'h5 badge ' + Helpers.classHelper(Status)}>{Status}</span>
							</h5>
						</div>
					</div>
					<a href={'/view/location/' + encodeURIComponent(SessionLocation)} className="mb-1">
						{SessionLocation}
					</a>
					<br />
					<small>{Helpers.stringifySpeakers(SessionSpeakers)}</small>
				</div>
				<div className="card-footer">
					{VideoVenue && (
						<a href={'/view/type/VideoVenue'} className="badge badge-pill badge-dark">
							Recording ✓
						</a>
					)}
					&nbsp;
					{VideoRover && (
						<a href={'/view/type/VideoRover'} className="badge badge-pill badge-dark">
							Send Rover ✓
						</a>
					)}
					&nbsp;
					{LiveStream && (
						<a href={'/view/type/LiveStream'} className="badge badge-pill badge-dark">
							Livestream ✓
						</a>
					)}
					&nbsp;
					{QuickClip && (
						<a href={'/view/type/QuickClip'} className="badge badge-pill badge-dark">
							QuickClips ✓
						</a>
					)}
					&nbsp;
					{Photo && (
						<a href={'/view/type/Photo'} className="badge badge-pill badge-dark">
							Photo Priority ✓
						</a>
					)}
					&nbsp;
					{Audio && (
						<a href={'/view/type/Audio'} className="badge badge-pill badge-dark">
							Audio Priority ✓
						</a>
					)}
					&nbsp;
					{Transcript && (
						<a href={'/view/all/Transcript'} className="badge badge-pill badge-dark">
							Transcript Priority ✓
						</a>
					)}
					&nbsp;
					{Restriction && (
						<a href={'/view/all/Restriction'} className="badge badge-pill badge-danger">
							Restriction X
						</a>
					)}
				</div>
			</div>
		);
	}
}

export default SessionListItem;
