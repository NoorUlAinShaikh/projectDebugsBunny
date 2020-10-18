import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import moment from "moment";

import { fetchAllQuizes } from "../../store/actions";
import history from "../../history";
import Quiz from "../Quiz/Quiz";
import { QUIZES_NO_QUIZES_FALLBACK, AVAILABLE_QUIZES } from "../../helpers/constants";
import "./Quizes.css";

const Quizes = ({ match: { path } }) => {
	const [quizesList, setQuizesList] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		//fetch on mount
		dispatch(fetchAllQuizes());
	}, []);

	const quizes = useSelector(({ quizes }) => quizes);

	useEffect(() => {
		if (quizes) {
			setQuizesList(Object.values(quizes));
		}
	}, [quizes]);

	const renderQuizDetails = quiz => {
		const { id, quizName, quizStartDate, quizEndDate, questionsCount, takenBy = [] } = quiz;
		return (
			<div
				key={id}
				className="quiz-wrap"
				onClick={() => history.push(`${path}/quiz?id=${id}`)}
			>
				<div className="quiz-details">
					<div style={{ margin: "1rem 0", textTransform: "uppercase" }}>{quizName}</div>
					<div>{`Initiated on ${moment(quizStartDate).format("DD MMM Y")}`}</div>
					<div>{`Expires on ${moment(quizEndDate).format("DD MMM Y")}`}</div>
					<div
						style={{ margin: "1rem 0" }}
					>{`Number of questions: ${questionsCount}`}</div>
				</div>
				<hr />
				<div style={{ display: "flex", placeContent: "center" }}>
					{/**if quiz taken array contains userid then completed else available */}
					{path.split("/").includes("admin")
						? `${
								takenBy.length > 0
									? `${takenBy.length}${takenBy.length > 1 ? " users" : " user"}`
									: "Yet, Nobody"
						  } took the quiz`
						: "Completed / Available"}
				</div>
			</div>
		);
	};

	const renderQuizesList = () => {
		return quizesList && quizesList.length > 0 ? (
			quizesList.map(quiz => renderQuizDetails(quiz))
		) : (
			<div>{QUIZES_NO_QUIZES_FALLBACK}</div>
		);
	};

	const renderQuizes = () => (
		<div className="quizes-wrap">
			<div className="all-quizes-header"> {AVAILABLE_QUIZES} </div>
			<hr />
			<div className="quizes-container">{renderQuizesList()}</div>
		</div>
	);

	return (
		<Switch>
			<Route exact path={path} render={() => renderQuizes()} />
			<Route exact path={`${path}/quiz`} render={props => <Quiz {...props} />} />
		</Switch>
	);
};

export default Quizes;
