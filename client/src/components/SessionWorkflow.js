import React from 'react';
import QuickClip from './QuickClip';

class SessionWorkflow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: '',
			qc: []
		};
	}
	componentWillReceiveProps(props) { // Technically we shouldn't use componentWillRecieveProps because it will be deprecated in React 17, but 🤷🏻‍♂️
		this.setState({
		qc: props.details.QuickClip.length > 1 ? props.details.QuickClip : []
		})
	}

	// Quickclip Refs
	timecodeInRef = React.createRef();
	timecodeOutRef = React.createRef();
	introRef = React.createRef();
	outroRef = React.createRef();
	captionRef = React.createRef();

	// Workflow Refs
	recordedRef = React.createRef();
	renderedRef = React.createRef();
	quickclipRenderedRef = React.createRef();
	albumURLRef = React.createRef();
	sessionURLRef = React.createRef();
	youtubeURLRef = React.createRef();
	transcriptURLRef = React.createRef();
	audioURLRef = React.createRef();
	completeRef = React.createRef();

	updateWorkflow = event => {
		event.preventDefault();
		const body = {
			workflow: {
				recorded: this.recordedRef.current.checked,
				rendered: this.renderedRef.current.checked,
				quickclip: this.state.qc,
				quickclipRendered: this.quickclipRenderedRef.current.checked,
				albumURL: this.albumURLRef.current.value,
				sessionURL: this.sessionURLRef.current.value,
				youtubeURL: this.youtubeURLRef.current.value,
				transcriptURL: this.transcriptURLRef.current.value,
				audioURL: this.audioURLRef.current.value,
				status: this.state.status ? this.state.status : 'In Progress',
				complete: this.completeRef.current.checked
			}
		};
		this.props.updateSession(body);
		alert('Saved!');
	};

	saveQuickClip = event => {
		event.preventDefault();
		const qcInstance = {
			timecodeIn: this.timecodeInRef.current.value,
			timecodeOut: this.timecodeOutRef.current.value,
			intro: this.introRef.current.value,
			outro: this.outroRef.current.value,
			caption: this.captionRef.current.value
		};

		this.setState({qc: [...this.state.qc, qcInstance]})	
	};

	deleteQuickClip = event => {
		event.preventDefault();
		console.log(event.target.parentElement);
	}

	render() {
		return (
			<div className="container">
				<div className="form-row">
					<div className="col">
						<h4>Workflow</h4>
						<form id="workflowForm" onSubmit={this.updateWorkflow}>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="checkbox"
									name="recorded"
									ref={this.recordedRef}
									id="inputRecorded"
									defaultChecked={this.props.details.Recorded}
								/>
								<label htmlFor="inputRecorded" className="form-check-label">
									Recorded
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="checkbox"
									name="rendered"
									id="inputRendered"
									ref={this.renderedRef}
									defaultChecked={this.props.details.Rendered}
								/>
								<label htmlFor="inputRendered" className="form-check-label">
									Rendered
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="checkbox"
									name="quickcliprendered"
									id="inputQuickClipRendered"
									ref={this.quickclipRenderedRef}
									defaultChecked={this.props.details.QuickClipRendered}
								/>
								<label htmlFor="inputQuickClipRendered" className="form-check-label">
									QuickClips Rendered
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="checkbox"
									name="complete"
									id="inputComplete"
									ref={this.completeRef}
									defaultChecked={this.props.details.Complete}
								/>
								<label htmlFor="inputComplete" className="form-check-label">
									Complete
								</label>
							</div>
							<label htmlFor="youtubeURLInput">Youtube URL</label>
							<input
								type="text"
								className="form-control"
								placeholder={this.props.details.YouTubeURL}
								ref={this.youtubeURLRef}
								id="youtubeURLInput"
							/>
							<label htmlFor="sessionURLInput">Session URL</label>
							<input
								type="text"
								className="form-control"
								placeholder={this.props.details.SessionURL}
								ref={this.sessionURLRef}
								id="sessionURLInput"
							/>
							<label htmlFor="albumURLInput">Album URL</label>
							<input
								type="text"
								className="form-control"
								placeholder={this.props.details.AlbumURL}
								ref={this.albumURLRef}
								id="albumURLInput"
							/>
							<label htmlFor="audioURLInput">Audio URL</label>
							<input
								type="text"
								className="form-control"
								placeholder={this.props.details.AudioURL}
								ref={this.audioURLRef}
								id="audioURLInput"
							/>
							<label htmlFor="transcriptURLInput">Transcript URL</label>
							<input
								type="text"
								className="form-control"
								placeholder={this.props.details.TranscriptURL}
								ref={this.transcriptURLRef}
								id="transcriptURLInput"
							/>
						</form>
					</div>
					<div className="col">
						<form action="" id="quickclipEntry" onSubmit={this.saveQuickClip}>
							<h5>QuickClips Entry Form</h5>
							<div className="p-3 mb-2 bg-warning text-dark">
								<small>
									Please save content back to database or these entries will be erased on refreshes.
								</small>
							</div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Timecode IN"
									ref={this.timecodeInRef}
									required
								/>
							</div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Timecode OUT"
									ref={this.timecodeOutRef}
									required
								/>
							</div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Intro"
									ref={this.introRef}
									required
								/>
							</div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Outro"
									ref={this.outroRef}
									required
								/>
							</div>
							<div className="form-group mb-3">
								<label htmlFor="captionSuggestion">Caption Suggestion</label>
								<textarea
									className="form-control"
									id="captionSuggestion"
									rows="3"
									ref={this.captionRef}
								/>
							</div>
							<button type="submit" form="quickclipEntry" className="btn btn-primary">
								Add QuickClip Entry <br />
							</button>
						</form>
						{this.state.qc.length > 1 && (
							<div className="table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">TC In</th>
											<th scope="col">TC Out</th>
											<th scope="col">Intro</th>
											<th scope="col">Outro</th>
											<th scope="col">Caption</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{this.state.qc.map( (object, index) => (
											<QuickClip key={index} data={this.state.qc[index]} deleteQuickClip={this.deleteQuickClip}/>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
				<br />
				<button type="submit" form="workflowForm" className="btn btn-primary">
					Save Coverage
				</button>{' '}
				&nbsp;
				<button type="submit" form="workflowForm" className="btn btn-dark">
					Save and Exit
				</button>
			</div>
		);
	}
}
export default SessionWorkflow;
