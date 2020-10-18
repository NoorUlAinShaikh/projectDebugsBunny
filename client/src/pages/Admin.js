import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Quizes from "../components/Quizes/Quizes";
import CreateQuiz from "../components/CreateQuiz/CreateQuiz";

const Admin = ({ match: { path } }) => {
	return (
		<div className="pageContainer">
			<Switch>
				<Route exact path={path} render={() => <Redirect to={`${path}/quizes`} />} />
				<Route path={`${path}/quizes`} render={props => <Quizes {...props} />} />
				<Route path={`${path}/create_quiz`} component={CreateQuiz} />
			</Switch>
		</div>
	);
};

export default Admin;
