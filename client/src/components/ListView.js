import React from 'react';
import ListRow from './ListRow';
import { Link } from 'react-router-dom';

class ListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessions: [],
			type: this.props.match.params.type
		};
	}

	componentDidMount() {
		this.populateApp();
	}

	populateApp = async () => {
		const { type, param } = this.props.match.params;
		const url = '/api/v1/' + type + '/' + encodeURI(param);
		let api = await this.callApi(url);
		this.setState({
			sessions: api
		});
	}

	callApi = async url => {
		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			}
		})
		let status = response.status;
		let sessions;
		if (status >= 200 && status < 300) {
			sessions = response.json();
		}
		return sessions;
	};

	tableController = () => {
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
		const { sessions, type } = this.state;
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
						{sessions && sessions.map((session, key) => (
							<ListRow key={key} data={session} type={type} />
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ListView;
