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
				VideoVenue,
				VideoRover,
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
		const userName = this.props.userName ? this.props.userName : '';
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
					<Link
						to={{
							pathname: '/session/' + EventID,
							state: { user: userName }
						}}
						className="text-dark"
					>
						<div className="row">
							<div className="col-10">
								<h4>{SessionName}</h4>
							</div>
							<div className="col-2">
								<h5 className="text-right">
									<strong className="align-middle">#{EventID}</strong>
									&nbsp;
									<span className={'h5 badge ' + Helpers.classHelper(Status)}>{Status}</span>
								</h5>
							</div>
						</div>
					</Link>
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
					{VideoVenue && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/VideoVenue'}
							className="badge badge-pill badge-dark"
						>
							Recording ✓
						</Link>
					)}
					&nbsp;
					{VideoRover && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/VideoRover'}
							className="badge badge-pill badge-dark"
						>
							Send Rover ✓
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
							Photo Priority ✓
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
							Transcript Priority ✓
						</Link>
					)}
					{Quotes && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Quotes'}
							className="badge badge-pill badge-dark"
						>
							Quotes Priority ✓
						</Link>
					)}
					{Rundown && (
						<Link
							onClick={this.props.filter}
							to={'/view/type/Rundown'}
							className="badge badge-pill badge-dark"
						>
							Session Rundown ✓
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
