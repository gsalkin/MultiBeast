import React from 'react';

class SessionCoverage extends React.Component {

	videoRef = React.createRef();
	roverRef = React.createRef();
	livestreamRef = React.createRef();
	quickclipRef = React.createRef();
	photoRef = React.createRef();
	transcriptRef = React.createRef();
	podcastRef = React.createRef();
	coverageNotesRef = React.createRef();

	handleInputChange = event => {
		const value = event.target.value;
	}
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
				podcast: this.podcastRef.current.checked,
				notes: this.coverageNotesRef.current.value
			}
		};
		this.props.updateSession(body);
		alert('Saved!');
	};

	render() {
		return (
			<form id="coveragePlanForm" onSubmit={this.createCoverage}>
				<div className="form-row">
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="video"
								ref={this.videoRef}
								id="inputVideo"
								defaultChecked={this.props.details.VideoVenue}
							/>
							<label htmlFor="inputVideo" className="form-check-label col-form-label col-form-label-lg">
								Record Video
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="rover"
								ref={this.roverRef}
								id="inputRover"
								defaultChecked={this.props.details.VideoRover}
								
							/>
							<label htmlFor="inputRover" className="form-check-label col-form-label col-form-label-lg">
								Send Rover
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								type="checkbox"
								className="form-check-input"
								id="inputLivestream"
								ref={this.livestreamRef}
								name="livestream"
								defaultChecked={this.props.details.LiveStream}
								
							/>
							<label
								htmlFor="inputLivestream"
								className="form-check-label col-form-label col-form-label-lg"
							>
								Live Stream
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								type="checkbox"
								className="form-check-input"
								id="inputQuickclip"
								ref={this.quickclipRef}
								name="quickclip"
								defaultChecked={this.props.details.QuickClip}
								
							/>
							<label
								htmlFor="inputQuickclip"
								className="form-check-label col-form-label col-form-label-lg"
							>
								Quick Clip
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								type="checkbox"
								className="form-check-input"
								id="inputPhoto"
								ref={this.photoRef}
								name="photo"
								defaultChecked={this.props.details.Photo}
								
							/>
							<label htmlFor="inputPhoto" className="form-check-label col-form-label col-form-label-lg">
								Photo Priority
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								type="checkbox"
								className="form-check-input"
								id="inputTranscript"
								ref={this.transcriptRef}
								name="transcript"
								defaultChecked={this.props.details.Transcript}
								
							/>
							<label
								htmlFor="inputTranscript"
								className="form-check-label col-form-label col-form-label-lg"
							>
								Rush Transcript
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								type="checkbox"
								className="form-check-input"
								id="inputPodcast"
								ref={this.podcastRef}
								name="podcast"
								defaultChecked={this.props.details.Podcast}
								
							/>
							<label htmlFor="inputPodcast" className="form-check-label col-form-label col-form-label-lg">
								Podcast Priority
							</label>
						</div>
					</div>
				</div>
				<div className="bg-light">
					<pre>
						<p>{this.props.details.AspenNotes}</p>
					</pre>
				</div>
				
				<div className="form-row">
					<div className="form-group col-8 offset-2">
						<label htmlFor="inputCoverageNotes" className="col-form-label col-form-label-lg">Notes <small>(Please copy and paste the above if appending new information)</small>:</label>
						<textarea
							className="form-control"
							name="coveragenotes"
							id="inputCoverageNotes"
							ref={this.coverageNotesRef}
							rows="5"
							defaultValue={this.props.details.AspenNotes}
							onChange={this.handleInputChange.bind(this)}
						></textarea>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-3 offset-2">
						<button type="submit" form="coveragePlanForm" className="btn btn-primary">Save Coverage</button>
						&nbsp;
                		<button type="submit" form="coveragePlanForm" className="btn btn-dark">Save &amp; Exit</button>
					</div>
				</div>
			</form>
		);
	}
}

export default SessionCoverage;
