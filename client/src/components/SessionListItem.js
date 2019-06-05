import React from 'react';
import { Link } from 'react-router-dom';
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
			AspenCoverageFork: {
				Video,
				Rover,
				LiveStream,
				QuickClip,
				Audio,
				Photo,
				Transcript,
				Quotes,
				Rundown,
				Restriction
			}
		} = this.props.data;
		const avStatus = this.props.data.ArtsVisionFork.Status;
		//const userName = this.props.userName ? this.props.userName : sessionStorage.getItem('username');
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
					<Link to={'/view/season/' + encodeURIComponent(SessionFest)} className={'badge ' + seasonClass()}>
						{Helpers.seasonMarker(SessionFest)}
					</Link>
					&nbsp;
					<Link
						onClick={this.props.filter}
						className={Helpers.dateClassHelper(SessionDate)}
						to={'/view/date/' + SessionDate}
					>
						{SessionDate}
					</Link>
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
									onClick={() => this.props.setSessionID(EventID)}
									className="text-dark"
									href={'#' + EventID}
								>
									<h5 className="inline-link">{SessionName}</h5>
								</a>
								<Link
									to={{
										pathname: '/session/' + EventID
									}}
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
								{avStatus === 'cancelled' ? (
									<span className={'h5 badge ' + Helpers.classHelper(avStatus)}>{avStatus}</span>
								) : (
									<span className={'h5 badge ' + Helpers.classHelper(Status)}>{Status}</span>
								)}
							</h6>
						</div>
					</div>
					<Link
						onClick={this.props.filter}
						to={'/view/location/' + encodeURIComponent(SessionLocation)}
						className="mb-1"
					>
						{SessionLocation}
					</Link>
					<br />
					<small>{Helpers.stringifySpeakers(SessionSpeakers)}</small>
				</div>
				<div className="card-footer">
					{Video && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Video'}
							className="badge badge-pill badge-dark"
						>
							Record ✓
						</Link>
					)}
					&nbsp;
					{Rover && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Rover'}
							className="badge badge-pill badge-dark"
						>
							Rover ✓
						</Link>
					)}
					&nbsp;
					{LiveStream && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/LiveStream'}
							className="badge badge-pill badge-dark"
						>
							Livestream ✓
						</Link>
					)}
					&nbsp;
					{QuickClip && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/QuickClip'}
							className="badge badge-pill badge-dark"
						>
							Key Moments ✓
						</Link>
					)}
					&nbsp;
					{Photo && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Photo'}
							className="badge badge-pill badge-dark"
						>
							Photo ✓
						</Link>
					)}
					&nbsp;
					{Audio && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Audio'}
							className="badge badge-pill badge-dark"
						>
							Audio/Podcast ✓
						</Link>
					)}
					&nbsp;
					{Transcript && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Transcript'}
							className="badge badge-pill badge-dark"
						>
							Transcript ✓
						</Link>
					)}
					{Quotes && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Quotes'}
							className="badge badge-pill badge-dark"
						>
							Quotes ✓
						</Link>
					)}
					&nbsp;
					{Quotes && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Quotes'}
							className="badge badge-pill badge-dark"
						>
							Quotes ✓
						</Link>
					)}
					&nbsp;
					{Rundown && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Rundown'}
							className="badge badge-pill badge-dark"
						>
							Rundown ✓
						</Link>
					)}
					&nbsp;
					{Restriction && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Restriction'}
							className="badge badge-pill badge-danger"
						>
							Restriction ✕
						</Link>
					)}
				</div>
			</div>
		);
	}
}

export default SessionListItem;
