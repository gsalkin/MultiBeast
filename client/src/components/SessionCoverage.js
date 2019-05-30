/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import format from 'date-fns/format';

class SessionCoverage extends React.Component {
	videoRef = React.createRef();
	roverRef = React.createRef();
	livestreamRef = React.createRef();
	quickclipRef = React.createRef();
	photoRef = React.createRef();
	transcriptRef = React.createRef();
	audioRef = React.createRef();
	restrictionRef = React.createRef();
	coverageNotesRef = React.createRef();
	quotesRef = React.createRef();
	rundownRef = React.createRef();

	createCoverage = event => {
		event.preventDefault();
		const body = {
			coverage: {
				video: this.videoRef.current.checked,
				rover: this.roverRef.current.checked,
				livestream: this.livestreamRef.current.checked,
				quickclip: this.quickclipRef.current.checked,
				photo: this.photoRef.current.checked,
				transcript: this.transcriptRef.current.checked,
				audio: this.audioRef.current.checked,
				quotes: this.quotesRef.current.checked,
				rundown: this.rundownRef.current.checked,
				restriction: this.restrictionRef.current.checked,
				notes: this.coverageNotesRef.current.value.length > 1
						? this.props.details.AspenNotes +
						  '\n' +
						  this.props.user +
						  ' on ' +
						  format(Date.now(), 'YYYY-MM-DD@h:mmA') +
						  ': ' +
						  this.coverageNotesRef.current.value
						: this.props.details.AspenNotes
			}
		};
		this.props.updateSession(body);
		alert('Saved!');
	};

	render() {
		return (
			<form id="coveragePlanForm" onSubmit={this.createCoverage} className="row collapse">
				<div className="form-group col-3 px-4">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							name="video"
							ref={this.videoRef}
							id="inputVideo"
							defaultChecked={this.props.details.Video}
						/>
						<label htmlFor="inputVideo" className="form-check-label">
							Record Video
						</label>
					</div>

					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							name="rover"
							ref={this.roverRef}
							id="inputRover"
							defaultChecked={this.props.details.Rover}
						/>
						<label htmlFor="inputRover" className="form-check-label">
							Send Rover
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputLivestream"
							ref={this.livestreamRef}
							name="livestream"
							defaultChecked={this.props.details.LiveStream}
						/>
						<label htmlFor="inputLivestream" className="form-check-label">
							Livestream
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputQuickclip"
							ref={this.quickclipRef}
							name="quickclip"
							defaultChecked={this.props.details.QuickClip}
						/>
						<label htmlFor="inputQuickclip" className="form-check-label">
							Key Moments
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputPhoto"
							ref={this.photoRef}
							name="photo"
							defaultChecked={this.props.details.Photo}
						/>
						<label htmlFor="inputPhoto" className="form-check-label">
							Photo Priority
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputTranscript"
							ref={this.transcriptRef}
							name="transcript"
							defaultChecked={this.props.details.Transcript}
						/>
						<label htmlFor="inputTranscript" className="form-check-label">
							Rush Transcript
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputAudio"
							ref={this.audioRef}
							name="audio"
							defaultChecked={this.props.details.Audio}
						/>
						<label htmlFor="inputPodcast" className="form-check-label">
							Audio/Podcast Priority
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputQuotes"
							ref={this.quotesRef}
							name="quotes"
							defaultChecked={this.props.details.Quotes}
						/>
						<label htmlFor="inputPodcast" className="form-check-label">
							Collect Quotes
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputRundown"
							ref={this.rundownRef}
							name="quote"
							defaultChecked={this.props.details.Rundown}
						/>
						<label htmlFor="inputPodcast" className="form-check-label">
							Session Rundown
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputrestriction"
							ref={this.restrictionRef}
							name="restriction"
							defaultChecked={this.props.details.Restriction}
						/>
						<label htmlFor="inputPodcast" className="form-check-label">
							Restriction
						</label>
					</div>
					<br/>
					<br/>
					<button type="submit" form="coveragePlanForm" className="btn btn-primary">
						Save Coverage
					</button>
				</div>
				<div className="form-group col-9">
					<div className="bg-light">
						<pre>
							<small>{this.props.details.AspenNotes}</small>
						</pre>
					</div>
					<label htmlFor="inputCoverageNotes" className="">
						<small>Enter Notes Here:</small>
					</label>
					<textarea
						className="form-control"
						name="coveragenotes"
						id="inputCoverageNotes"
						ref={this.coverageNotesRef}
						rows="4"
					/>
				</div>
			</form>
		);
	}
}

export default SessionCoverage;
