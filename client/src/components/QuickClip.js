import React from 'react';

class QuickClip extends React.Component {
	render() {
		return (
			<tr>
				<td>
					<small>{this.props.data.timecodeIn}</small>
				</td>
				<td>
					<small>{this.props.data.timecodeOut}</small>
				</td>
				<td>
					<small>{this.props.data.intro}</small>
				</td>
				<td>
					<small>{this.props.data.outro}</small>
				</td>
				<td>
					<small>{this.props.data.caption}</small>
				</td>
				<td>
					<button id={this.props.index} type="button" className="close" aria-label="Close" onClick={this.props.deleteQuickClip}>
						<span aria-hidden="true">&times;</span>
					</button>
				</td>
			</tr>
		);
	}
}

export default QuickClip;
