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

	componentWillReceiveProps(props) {
		// Technically we shouldn't use componentWillRecieveProps because it will be deprecated in React 17, but 🤷🏻‍♂️
		this.setState({
			qc: !props.details.QuickClip ? [] : props.details.QuickClip
		});
	}

	// Quickclip Refs
	qcTitleRef = React.createRef();
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
	sentToSpeakerRef = React.createRef();
	readyToSendRef = React.createRef();

	updateWorkflow = e => {
		e.preventDefault();
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
				readysend: this.readyToSendRef.current.checked,
				sent: this.sentToSpeakerRef.current.checked,
				complete: this.completeRef.current.checked
			}
		};
		this.props.updateSession(body);
		alert('Saved!');
	};

	saveQuickClip = e => {
		e.preventDefault();
		const qcInstance = {
			qcTitle: this.qcTitleRef.current.value,
			timecodeIn: this.timecodeInRef.current.value,
			timecodeOut: this.timecodeOutRef.current.value,
			intro: this.introRef.current.value,
			outro: this.outroRef.current.value,
			caption: this.captionRef.current.value
		};
		this.setState({ qc: [...this.state.qc, qcInstance] });
		e.currentTarget.reset();
	};

	deleteQuickClip = e => {
		e.preventDefault();
		let index = e.target.parentNode.id;
		let array = this.state.qc;
		array.splice(index, 1);
		this.setState({
			qc: array
		});
	};

	statusController = (e) => {
		const {value, checked} = e.target	
		if(checked) {
			this.setState({
				status: value
			})
		} else if (!checked) {
			this.setState({
				status: ''
			})
		}
	}

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
								onClick={this.statusController}
							/>
							<label htmlFor="inputRecorded" className="form-check-label">
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
								onClick={this.statusController}
							/>
							<label htmlFor="inputRendered" className="form-check-label">
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
								value="KM Rendered"
								onClick={this.statusController}
							/>
							<label htmlFor="inputQuickClipRendered" className="form-check-label">
								Key Moments Rendered
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="readytosend"
								id="inputSent"
								ref={this.readyToSendRef}
								defaultChecked={this.props.details.ReadySend}
								value="Ready to Send"
								onClick={this.statusController}
							/>
							<label htmlFor="inputSent" className="form-check-label">
								Ready to Send
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="sent"
								id="inputSent"
								ref={this.sentToSpeakerRef}
								defaultChecked={this.props.details.Sent}
								value="Sent"
								onClick={this.statusController}
							/>
							<label htmlFor="inputSent" className="form-check-label">
								Sent to Speaker(s)
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
								value="Complete"
								onClick={this.statusController}
							/>
							<label htmlFor="inputComplete" className="form-check-label">
								Complete
							</label>
						</div>
						<button type="submit" form="workflowForm" className="btn btn-primary">
							Save Workflow
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
						{this.props.details.YouTubeURL && (
							<a href={this.props.details.YouTubeURL} target="_blank" rel="noopener noreferrer">
								{this.props.details.YouTubeURL} <figure className="align-text-top fas fa-external-link-alt" />
							</a>
						)}
						<br/>
						<label htmlFor="sessionURLInput">Session URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.SessionURL}
							ref={this.sessionURLRef}
							id="sessionURLInput"
						/>
						{this.props.details.SessionURL && (
							<a href={this.props.details.SessionURL} target="_blank" rel="noopener noreferrer">
								{this.props.details.SessionURL} <figure className="align-text-top fas fa-external-link-alt" />
							</a>
						)}
						<br/>
						<label htmlFor="albumURLInput">Album URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.AlbumURL}
							ref={this.albumURLRef}
							id="albumURLInput"
						/>
						{this.props.details.AlbumURL && (
							<a href={this.props.details.AlbumURL} target="_blank" rel="noopener noreferrer">
								{this.props.details.AlbumURL} <figure className="align-text-top fas fa-external-link-alt" />
							</a>
						)}
						<br/>
						<label htmlFor="audioURLInput">Audio URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.AudioURL}
							ref={this.audioURLRef}
							id="audioURLInput"
						/>
						{this.props.details.AudioURL && (
							<a href={this.props.details.AudioURL} target="_blank" rel="noopener noreferrer">
								{this.props.details.AudioURL} <figure className="align-text-top fas fa-external-link-alt" />
							</a>
						)}
						<br/>
						<label htmlFor="transcriptURLInput">Transcript URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.TranscriptURL}
							ref={this.transcriptURLRef}
							id="transcriptURLInput"
						/>
						{this.props.details.TranscriptURL && (
							<a href={this.props.details.TranscriptURL} target="_blank" rel="noopener noreferrer">
								{this.props.details.TranscriptURL}
							</a>
						)}
					</div>
				</form>
				<br />
				<form action="" id="quickclipEntry" onSubmit={this.saveQuickClip}>
					<h5>QuickClips Entry Form</h5>
					<div className="p-3 mb-2 bg-warning text-dark">
						<small>Please save QuickClips before refreshing page.</small>
					</div>
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Title Suggestion"
							ref={this.qcTitleRef}
							required
						/>
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
							placeholder="Intro Quote"
							ref={this.introRef}
							required
						/>
					</div>
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Outro Quote"
							ref={this.outroRef}
							required
						/>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="captionSuggestion">Caption Suggestion</label>
						<textarea className="form-control" id="captionSuggestion" rows="3" ref={this.captionRef} />
					</div>
					<button type="submit" form="quickclipEntry" className="btn btn-primary mr-1">
						Add QuickClip Entry
					</button>
					<button type="submit" form="workflowForm" className="btn btn-dark">
						SAVE Workflow!
					</button>
				</form>
				<>
					{this.state.qc.length >= 1 && (
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Title</th>
										<th scope="col">TC In</th>
										<th scope="col">TC Out</th>
										<th scope="col">Intro</th>
										<th scope="col">Outro</th>
										<th scope="col">Caption</th>
										<th scope="col" />
									</tr>
								</thead>
								<tbody>
									{this.state.qc.map((object, index) => (
										<QuickClip
											index={index}
											key={index}
											data={this.state.qc[index]}
											deleteQuickClip={this.deleteQuickClip}
										/>
									))}
								</tbody>
							</table>
						</div>
					)}
				</>
				&nbsp;
			</div>
		);
	}
}
export default SessionWorkflow;
