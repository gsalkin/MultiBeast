/* eslint-disable no-unused-vars */
import React from 'react'; //If you're using JSX, you need to import React.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Session from './Session';
import NotFound from './NotFound';
import Login from './Login';
import Admin from './Admin';
import SplashPage from './SplashPage'

const Router = () => (
	<BrowserRouter>
		<Switch>
		<Route exact path="/" component={SplashPage} />
			<Route exact path="/" component={Login} />
			<Route exact path="/Login" component={Login} />
			<Route exact path="/admin" component={Admin} />
			<Route exact path="/view/:type" component={App} />
			<Route path="/session/:sessionID" component={Session} />
			<Route path="/view/:type/:param" component={App} />
			<Route component={NotFound} /> {/* Catch all for 404s. No path */}
		</Switch>
	</BrowserRouter>
);

export default Router;
