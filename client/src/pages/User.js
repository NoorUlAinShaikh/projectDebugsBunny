import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../store/actions";
import Quizes from "../components/Quizes/Quizes";

const User = ({ match: { path } }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);

	return (
		<div className="pageContainer">
			<Switch>
				<Route exact path={path} render={() => <Redirect to={`${path}/quizes`} />} />
				<Route path={`${path}/quizes`} render={props => <Quizes {...props} />} />
			</Switch>
		</div>
	);
};

export default User;
