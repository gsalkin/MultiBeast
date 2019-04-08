import React from 'react';
import SessionListItem from './SessionListItem';
import Header from './Header';
import SideNav from './SideNav';

class App extends React.Component {
	state = {
		sessions: {}
	};

	callApi = async url => {
		let response = await fetch(url);
		let status = await response.status;
		if (status >= 200 && status < 300) {
			return await response.json();
		} else {
			throw Error(await response.statusText);
		}
	};

	componentDidMount() {
		let type = this.props.match.params.type;
		let param = this.props.match.params.param;
		var url = ''
		if (!param) {
			url = '/api/view/all'
		} else {
			url = '/api/view/' + type + '/' + param
		}
		this.callApi(url).then(body => {
			this.setState({
				sessions: body
			});
		});
	}

	filterDate = date => {
		this.callApi('/api/view/date/' + date).then(body => {
			this.setState({
				sessions: body
			});
		});
	};

	filterLocation = location => {
		this.callApi('/api/view/location/' + location).then(body => {
			this.setState({
				sessions:body
			})
		})
	}

	filterType(type) {}
	render() {
		return (
			<div className="container-fluid">
				<Header />
				<div className="row">
					<div className="col-2">
						<SideNav
							filterDate={this.filterDate}
							filterLocation={this.filterLocation}
							filterType={this.filterType}
						/>
					</div>
					<div className="col-10">
						<div className="list-group">
							{Object.keys(this.state.sessions).map(key => (
								<SessionListItem key={key} data={this.state.sessions[key]} />
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
