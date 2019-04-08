import React from 'react';

class SessionWorkflow extends React.Component {

	recordedRef = React.createRef();
	renderedRef = React.createRef();
	quickclipRef = React.createRef();
	albumURLRef = React.createRef();
	sessionURLRef = React.createRef();
	youtubeURLRef = React.createRef();
	completeRef = React.createRef();

	updateWorkflow = event => {
		event.preventDefault();
		const body = {
			workflow: {
				recorded: this.recordedRef.current.checked,
				rendered: this.renderedRef.current.checked,
				quickclip: this.quickclipRef.current.checked,
				albumURL: this.albumURLRef.current.value,
				sessionURL: this.sessionURLRef.current.value,
				youtubeURL: this.youtubeURLRef.current.value,
				complete: this.completeRef.current.checked
			}
		};
		this.props.updateSession(body);
		alert('Saved!');
	};

	render() {
		return (
			<form id="workflowForm" onSubmit={this.updateWorkflow}>
				<div className="form-row">
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="recorded"
								ref={this.recordedRef}
								id="inputRecorded"
								defaultChecked={this.props.details.Recorded}
							/>
							<label
								htmlFor="inputRecorded"
								className="form-check-label col-form-label col-form-label-lg"
							>
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
							<label
								htmlFor="inputRendered"
								className="form-check-label col-form-label col-form-label-lg"
							>
								Rendered
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
							<label
								htmlFor="inputComplete"
								className="form-check-label col-form-label col-form-label-lg"
							>
								Complete & Added to ArtsVision
							</label>
						</div>
					</div>
				</div>
				<div className="form-row">
					<div className="col">
						<label htmlFor="youtubeURLInput">Youtube URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.YouTubeURL}
							ref={this.youtubeURLRef}
							id="youtubeURLInput"
						/>
					</div>
					<div className="col">
						<label htmlFor="sessionURLInput">Session URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.SessionURL}
							ref={this.sessionURLRef}
							id="sessionURLInput"
						/>
					</div>
					<div className="col">
						<label htmlFor="albumURLInput">Album URL</label>
						<input
							type="text"
							className="form-control"
							placeholder={this.props.details.AlbumURL}
							ref={this.albumURLRef}
							id="albumURLInput"
							
						/>
					</div>
				</div>
				<br />
				<div className="form-row">
					<div className="form-group col-8 offset-2">
						<label htmlFor="quickclipInput">
							QuickClips{' '}
							<small>(Format: Start Timestamp | End timestamp | Start Quote | End Quote | Title)</small>
						</label>
						<textarea className="form-control" id="quickclipInput" rows="7" ref={this.quickclipRef} />
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-3 offset-2">
						<button type="submit" form="workflowForm" className="btn btn-primary">
							Save Coverage
						</button>
						&nbsp;
						<button type="submit" form="workflowForm" className="btn btn-dark">
							Save &amp; Exit
						</button>
					</div>
				</div>
			</form>
		);
	}
}

export default SessionWorkflow;
