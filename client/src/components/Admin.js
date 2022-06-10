import React from 'react';
import { Link } from 'react-router-dom';

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			admin: '',
			userList: {}
		}
	}

	componentDidMount() {
		this.fetchUsers();
	}

	usernameRef = React.createRef();
	passwordRef = React.createRef();
	adminRef = React.createRef();

	createUser = e => {
		e.preventDefault();
		let username = this.usernameRef.current.value;
		let password = this.passwordRef.current.value;
		let admin = this.adminRef.current.checked;
		this.addUserToDatabase(username, password, admin);
		e.currentTarget.reset();
	};

	fetchUsers = async () => {
		let res = await fetch('/admin/users', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			}
		})
		let users = await res.json();
		this.setState({
			userList: users
		})
	};

	addUserToDatabase = async (username, password, admin) => {
		let res = await fetch('/admin/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password,
				admin: admin
			})
		})
		if (res.status === 200) {
			return res.json();
		} else {
			alert('User creation error. Check express logs');
		}
		this.fetchUsers()
	};

	render() {
		const { userList } = this.state;
		return (
			<div className="container-fluid">
				<nav className="navbar navbar-light">
					<Link className="navbar-brand" to="/view/all" onClick={this.props.filter}>
						<img src="/images/favicon/apple-icon.png" width="50" height="50" alt="" />
						&nbsp; MultiBeast
					</Link>
				</nav>
				<div className="container">
					<div className="row">
						<div className="col-6">
							<form onSubmit={this.createUser}>
								<div className="form-group">
									<h3>Create User:</h3>
									<input
										type="text"
										className="form-control"
										id="inputUsername"
										placeholder="Enter username"
										ref={this.usernameRef}
										required
									/>
									<small id="usernameHelp" className="form-text text-muted">
										Username should be first initial and last name. Ex. "jsmith"
									</small>
								</div>
								<div className="form-group">
									<input
										type="password"
										className="form-control"
										id="inputPassword"
										placeholder="Password"
										ref={this.passwordRef}
										minLength="8"
										required
									/>
								</div>
								<div className="form-group form-check">
									<input type="checkbox" className="form-check-input" id="admincheckbox" ref={this.adminRef} />
									<label className="form-check-label" htmlFor="admincheckbox">
										Is Admin?
									</label>
								</div>
								<button type="submit" className="btn btn-primary">
									Create User
								</button>
							</form>
						</div>
						<div className="col-6">
							<h3>Existing Users:</h3>
							<div className="list-group">
								{Object.keys(userList).map(key => (
									<button key={key} href="#" className="list-group-item list-group-item-action">
										{userList[key].username}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Admin;
