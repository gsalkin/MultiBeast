import React from 'react';

class QuickClip extends React.Component {
	render() {
		return (
			<tr>
				<td>
					<small>{this.props.data.timecodeIn !== null ? this.props.data.timecodeIn : ''}</small>
				</td>
				<td>
					<small>{this.props.data.timecodeOut !== null ? this.props.data.timecodeOut : ''}</small>
				</td>
				<td>
					<small>{this.props.data.intro !== null ? this.props.data.intro : ''}</small>
				</td>
				<td>
					<small>{this.props.data.outro !== null ? this.props.data.outro : ''}</small>
				</td>
				<td>
					<small>{this.props.data.caption !== null ? this.props.data.caption : ''}</small>
				</td>
				<td>
					<button type="button" className="close" aria-label="Close" onClick={this.props.deleteQuickClip}>
						<span aria-hidden="true">&times;</span>
					</button>
				</td>
			</tr>
		);
	}
}

export default QuickClip;
