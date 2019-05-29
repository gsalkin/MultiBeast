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
	quoteRef = React.createRef();
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
				quote: this.quoteRef.current.checked,
				rundown: this.rundownRef.current.checked,
				restriction: this.restrictionRef.current.checked,
				notes: this.coverageNotesRef.current.value.length > 1
						? this.props.details.AspenNotes +
						  '\n\n' +
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
							defaultChecked={this.props.details.VideoVenue}
						/>
						<label htmlFor="inputVideo" className="form-check-label col-form-label col-form-label-md">
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
							defaultChecked={this.props.details.VideoRover}
						/>
						<label htmlFor="inputRover" className="form-check-label col-form-label col-form-label-md">
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
						<label htmlFor="inputLivestream" className="form-check-label col-form-label col-form-label-md">
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
						<label htmlFor="inputQuickclip" className="form-check-label col-form-label col-form-label-md">
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
						<label htmlFor="inputPhoto" className="form-check-label col-form-label col-form-label-md">
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
						<label htmlFor="inputTranscript" className="form-check-label col-form-label col-form-label-md">
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
						<label htmlFor="inputPodcast" className="form-check-label col-form-label col-form-label-md">
							Audio/Podcast Priority
						</label>
					</div>
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="inputQuote"
							ref={this.quoteRef}
							name="quote"
							defaultChecked={this.props.details.Quote}
						/>
						<label htmlFor="inputPodcast" className="form-check-label col-form-label col-form-label-md">
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
						<label htmlFor="inputPodcast" className="form-check-label col-form-label col-form-label-md">
							Create Session Rundown
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
						<label htmlFor="inputPodcast" className="form-check-label col-form-label col-form-label-md">
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
						rows="5"
						defaultValue={this.props.details.AspenNotes}
					/>
				</div>
			</form>
		);
	}
}

export default SessionCoverage;
