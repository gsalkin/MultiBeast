/* eslint-disable no-unused-vars */
import React from 'react'; //If you're using JSX, you need to import React.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './App';
import Session from './Session';
import NotFound from './NotFound';
import Login from './Login';
import Admin from './Admin';
import SplashPage from './SplashPage';

class Router extends React.Component {
	render() {
		return (
			// THE ORDER OF THE ROUTES ARE IMPORTANT
			<BrowserRouter basename="">
				<Switch>
					<Route exact path="/" component={SplashPage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/admin" component={Admin} />
					<Route path="/view/:type/:param" component={Home} />
					<Route path="/view/:type" component={Home} />
					<Route path="/session/:sessionID" component={Session} />
					<Route component={NotFound} /> {/* Catch all for 404s. No path */}
				</Switch>
			</BrowserRouter>
		);
	}
}
export default Router;
