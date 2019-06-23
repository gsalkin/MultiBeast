import React from 'react';
import ListRow from './ListRow';
import { Link } from 'react-router-dom';

class ListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessions: {},
			type: this.props.match.params.type
		};
		this.populateApp();
	}

	populateApp = () => {
		const { type, param } = this.props.match.params;
		const url = '/api/v1/' + type + '/' + encodeURI(param);
		if (type === 'type') {
			this.callApi(url).then(body => {
				this.setState({
					sessions: body
				});
			});
		} else {
			this.callApi(url).then(body => {
				this.setState({
					sessions: body.filter(session => session.AspenCoverageFork.Video === true || session.AspenCoverageFork.Rover === true)
				});
			});
		}
	};

	callApi = async url => {
		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			}
		})
			.then(response => {
				let status = response.status;
				if (status >= 200 && status < 300) {
					return response.json();
				}
			})
			.catch(error => {
				console.log(error);
			});
		return response;
	};

	tableController() {
		let type = this.state.type
		if (type === 'location') {
			return (
				<thead>
					<tr>
						<th scope="col">Event ID</th>
						<th scope="col">Date</th>
						<th scope="col">Session Name</th>
						<th scope="col">Time</th>
					</tr>
				</thead>
			);
		} else if (type === 'date') {
			return (
				<thead>
					<tr>
						<th scope="col">Event ID</th>
						<th scope="col">Location</th>
						<th scope="col">Session Name</th>
						<th scope="col">Time</th>
					</tr>
				</thead>
			)
		} else if (type === 'type') {
			return (
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Event ID</th>
						<th scope="col">Location</th>
						<th scope="col">Session Name</th>
						<th scope="col">Time</th>
					</tr>
				</thead>
			)
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<nav className="navbar navbar-light">
					<Link className="navbar-brand" to="/view/all">
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast |{' '}
						<span className="badge badge-dark mr-1">
							{this.props.match.params.type.toUpperCase()}: {this.props.match.params.param}
						</span>
					</Link>
				</nav>
				<table class="table table-striped">
					{this.tableController()}
					<tbody>
						{Object.keys(this.state.sessions).map(key => (
							<ListRow key={key} data={this.state.sessions[key]} type={this.state.type}/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ListView;
