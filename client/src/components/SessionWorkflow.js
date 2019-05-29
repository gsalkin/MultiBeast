import React, { Fragment } from 'react';
import QuickClip from './QuickClip';

class SessionWorkflow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: '',
			qc: []
		};
	}
	componentDidMount() {
		this.setState({
		qc: !this.props.details.QuickClip ? [] : this.props.details.QuickClip
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
		this.setState({ qc: [...this.state.qc, qcInstance] });
		event.currentTarget.reset();
	};

	deleteQuickClip = event => {
		event.preventDefault();
		console.log('3: ' + this.state.qc);
		let index = event.target.parentNode.id;
		let array = this.state.qc;
		array.splice(index, 1);
		this.setState({
			qc: array
		});
	};

	render() {
		return (
			<div className="container-fluid collapse" id="workflowContainer">
				<form id="workflowForm" onSubmit={this.updateWorkflow} className="row">
					<div className="form-group col-3 px-2">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="recorded"
								ref={this.recordedRef}
								id="inputRecorded"
								defaultChecked={this.props.details.Recorded}
								value="Recorded"
							/>
							<label htmlFor="inputRecorded" className="form-check-label col-form-label col-form-label-md">
								Recorded
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="rendered"
								id="inputRendered"
								ref={this.renderedRef}
								defaultChecked={this.props.details.Rendered}
								value="Rendered"
							/>
							<label htmlFor="inputRendered" className="form-check-label col-form-label col-form-label-md">
								Rendered
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="quickcliprendered"
								id="inputQuickClipRendered"
								ref={this.quickclipRenderedRef}
								defaultChecked={this.props.details.QuickClipRendered}
							/>
							<label htmlFor="inputQuickClipRendered" className="form-check-label col-form-label col-form-label-md">
								QuickClips Rendered
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="complete"
								id="inputComplete"
								ref={this.completeRef}
								defaultChecked={this.props.details.Complete}
							/>
							<label htmlFor="inputComplete" className="form-check-label col-form-label col-form-label-md">
								Complete
							</label>
						</div>
						<button type="submit" form="workflowForm" className="btn btn-primary">
							Save Coverage
						</button>
					</div>
					<br />
					<div className="form-group col-9">
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
					</div>
				</form>
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
