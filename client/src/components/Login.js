import React from 'react';
import Header from './Header';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			redirectTo: '/view/all',
			userName: ''
		};
	}

	componentDidMount() {}

	usernameRef = React.createRef();
	passwordRef = React.createRef();

	appLogin = e => {
		e.preventDefault();
		let username = this.usernameRef.current.value;
		let password = this.passwordRef.current.value;
		this.loginUser(username, password);
	};

	loginUser = (username, password) => {
		fetch('/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					alert('Login Error. Either incorrect Username or Password');
				}
			})
			.then(json => {
				sessionStorage.setItem('jwt_token', json.token);
				sessionStorage.setItem('user_name', json.user);
				this.setState({
					loggedIn: true,
					userName: json.user
				});
				this.props.history.push({
					pathname: this.state.redirectTo,
					state: {
						userName: this.state.userName
					}
				});
			})
			.catch(error => {
				console.log('login error: ' + error);
			});
	};

	render() {
		return (
			<div className="container-fluid">
				<Header status="disabled" />
				<div className="container">
					<div className="row">
						<div className="col-8 offset-2">
							<div className="jumbotron">
								<h1 className="display-4">MultiBeast</h1>
								<p className="lead">
									MultiBeast organizes and filters Aspen Ideas Festival sessions based on the Aspen
									Institute's coverage strategy.
								</p>
								<hr className="my-4" />
								<form onSubmit={this.appLogin}>
									<div className="form-group">
										<label htmlFor="inputUsername">Username</label>
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
										<label htmlFor="inputPassword">Password</label>
										<input
											type="password"
											className="form-control"
											id="inputPassword"
											placeholder="Password"
											ref={this.passwordRef}
											required
										/>
										<small id="passwordHelp" className="form-text text-muted">
											Forgot password? Please contact{' '}
											<a href="mailto:gabriel.salkin@aspeninstitute.org">Gabe Salkin</a>
										</small>
									</div>
									<button type="submit" className="btn btn-primary">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
