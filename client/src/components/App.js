import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Landing from "../components/Landing/Landing";
import Admin from "../pages/Admin";
import User from "../pages/User";
import history from "../history";

const App = () => {
	return (
		<Router history={history}>
			<Header />
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/admin" render={props => <Admin {...props} />} />
				<Route path="/user" component={User} />
			</Switch>
		</Router>
	);
};

export default App;
