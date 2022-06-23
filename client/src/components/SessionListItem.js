import React from 'react';
import { Link } from 'react-router-dom';
import * as Helpers from '../helpers';

const SessionListItem = ({ data, filter, userName, setSessionID }) => {
	const {
		SessionName,
		SessionDate,
		SessionLocation,
		StartTime,
		EndTime,
		EventID,
		SessionSpeakers,
		SessionFest,
		Status: avStatus
	} = data.ArtsVisionFork;
	const { Status } = data.AspenChecklistFork;
	const {
		Video,
		Rover,
		LiveStream,
		QuickClip,
		Audio,
		Photo,
		Transcript,
		Quotes,
		Rundown,
		Restriction,
		AspenNotes
	} = data.AspenCoverageFork;
	const seasonClass = () => {
		if (Helpers.seasonMarker(SessionFest) === 'Aspen Ideas Health') {
			return 'purple__aspen';
		} else {
			return 'brightblue__aspen';
		}
	};
	return (
		<div className="card" id={'event-' + EventID} data-session-label={SessionName}>
			<div className="card-header">
				<span className={'badge ' + seasonClass()}>{Helpers.seasonMarker(SessionFest)}</span>
				&nbsp;
				<span className={Helpers.dateClassHelper(SessionDate)}>{SessionDate}</span>
				&nbsp;
				<span className="badge border border-primary rounded-lg">
					{Helpers.convertTimes(StartTime)} to {Helpers.convertTimes(EndTime)}
				</span>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col-10">
						<div id="mobileDisplayController_full">
							<a
								onClick={() => setSessionID(EventID)}
								className="text-dark"
								href={'#' + EventID}
							>
								<h5 className="inline-link">{SessionName}</h5>
							</a>
							<Link
								to={{pathname: '/session/' + EventID}}
								className="ml-2 text-dark inline-link"
							//target="_blank"
							>
								<figure className="align-text-top fas fa-external-link-alt" />
							</Link>
						</div>
						{/** id mobileDisplayController_small has display:none w/ width < 1024 **/}
						<div id="mobileDisplayController_small">
							<Link to={'/session/' + EventID} className="ml-2 text-dark inline-link">
								<h5>{SessionName}</h5>
							</Link>
						</div>
					</div>
					<div className="col-2">
						<h6 className="text-right">
							<strong className="align-middle">#{EventID}</strong>
							&nbsp;
							{avStatus === 'Cancelled' || avStatus === 'Confirmed' ? (
								<span className={'h5 badge ' + Helpers.classHelper(avStatus)}>{avStatus}</span>
							) : (
								<span className={'h5 badge ' + Helpers.classHelper(Status)}>{Status}</span>
							)}
						</h6>
					</div>
				</div>
				<span
					to={'/view/location/' + encodeURIComponent(SessionLocation)}
					className="mb-1 text-primary"
				>
					{SessionLocation}
				</span>
				<br />
				<small>{Helpers.stringifySpeakers(SessionSpeakers)}</small>
			</div>
			<div className="card-footer">
				{Video && (
					<button
						onClick={() => filter('meta', 'Video')}
						className="badge badge-pill badge-dark mr-1"
					>
						Record ✓
					</button>
				)}
				{Rover && (
					<button
						onClick={() => filter('meta', 'Rover')}
						className="badge badge-pill badge-dark mr-1"
					>
						Rover ✓
					</button>
				)}
				{LiveStream && (
					<button
						onClick={() => filter('meta', 'LiveStream')}
						className="badge badge-pill badge-dark mr-1"
					>
						Livestream ✓
					</button>
				)}
				{QuickClip && (
					<button
						onClick={() => filter('meta', 'QuickClip')}
						className="badge badge-pill badge-dark mr-1"
					>
						Key Moments ✓
					</button>
				)}
				{Photo && (
					<button
						onClick={() => filter('meta', 'Photo')}
						className="badge badge-pill badge-dark mr-1"
					>
						Photo ✓
					</button>
				)}
				{Audio && (
					<button
						onClick={() => filter('meta', 'Audio')}
						className="badge badge-pill badge-dark mr-1"
					>
						Audio/Podcast ✓
					</button>
				)}
				{Transcript && (
					<button
						onClick={() => filter('meta', 'Transcript')}
						className="badge badge-pill badge-dark mr-1"
					>
						Transcript ✓
					</button>
				)}
				{Quotes && (
					<button
						onClick={() => filter('meta', 'Quotes')}
						className="badge badge-pill badge-dark mr-1"
					>
						Quotes ✓
					</button>
				)}
				{Rundown && (
					<button
						onClick={() => filter('meta', 'Rundown')}
						className="badge badge-pill badge-dark mr-1"
					>
						Rundown ✓
					</button>
				)}
				{AspenNotes && (
					<Link
						onClick={() => setSessionID(EventID)}
						to={'#' + EventID}
						className="badge badge-pill badge-warning mr-1"
					>
						See Notes ●
					</Link>
				)}
				{Restriction && (
					<button
						onClick={() => filter('meta', 'Restriction')}
						className="badge badge-pill badge-danger mr-1"
					>
						Restriction ✕
					</button>
				)}
			</div>
		</div>
	);
}


export default SessionListItem;
