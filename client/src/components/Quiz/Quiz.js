import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { fetchQuiz, submitQuiz } from "../../store/actions";
import history from "../../history";
import UserForm from "../UserForm/UserForm";
import Hamburger from "../Hamburger/Hamburger";
import {
	NO_QUESTIONS_FALLBACK,
	QUIZ_ACTION_SUBMIT,
	QUIZ_ACTION_NEXT,
	QUIZ_ACTION_PREVIOUS,
	QUIZ_QUESTION_HEADER,
	QUIZ_ANSWER_HEADER,
	QUIZ_NO_OPTIONS_FALLBACK,
	QUIZ_TO_QUIZES_BUTTON,
	LOADING
} from "../../helpers/constants";
import "./Quiz.css";

const Quiz = ({ location, match }) => {
	const dispatch = useDispatch();

	const [quiz, setQuiz] = useState({});
	const [toggleQuestionList, setToggleQuestionsList] = useState(false);
	const [selectedQuestion, setSelectedQuestion] = useState(0);
	const [submittedAnswers, setSubmittedAnswers] = useState([]);
	const [showUserForm, setShowUserForm] = useState(false);

	const quizes = useSelector(({ quizes }) => quizes);

	useEffect(() => {
		const quizId = getQuizID();
		//fetch quiz here if not present in store
		if (!(quizes && quizes[quizId])) dispatch(fetchQuiz(quizId));
	}, []);

	useEffect(() => {
		const quizId = getQuizID();
		if (quizId && quizes && quizes[quizId]) {
			setQuiz(quizes[quizId]);
		}
	}, [quizes]);

	const getQuizID = () => new URLSearchParams(location.search).get("id");

	const handleOptionSelection = (quesID, optionID) => {
		setSubmittedAnswers({ ...submittedAnswers, [quesID]: optionID });
	};

	const handleQuizSubmition = userInfo => {
		const questions = Object.entries(submittedAnswers).map(([quesID, optionID]) => ({
			[quesID]: optionID
		}));
		const quizAnswers = {
			...userInfo,
			quiz: { quizID: parseInt(getQuizID()), questions }
		};
		dispatch(submitQuiz(quizAnswers));
	};

	const handleQuestionSelection = index => {
		if (toggleQuestionList) setToggleQuestionsList(false);
		setSelectedQuestion(index);
	};

	const renderQuestionsList = () => {
		const { questions } = quiz;
		return (
			<div className={`questions-list-container${toggleQuestionList ? " tuck-in" : ""}`}>
				{questions && questions.length > 0 ? (
					questions.map(({ quesID, question }, index) => (
						<div
							key={quesID}
							className={`question-container${
								selectedQuestion === index ? " selected" : ""
							}`}
							onClick={() => handleQuestionSelection(index)}
						>
							<div>{`${index + 1}. `}</div>
							<div>{question}</div>
						</div>
					))
				) : (
					<div>{NO_QUESTIONS_FALLBACK}</div>
				)}
			</div>
		);
	};

	const renderQuestionActions = () => (
		<div className="question-actions">
			<Button
				disabled={match.path.split("/").includes("admin")}
				variant="outlined"
				color="secondary"
				onClick={() => setShowUserForm(true)}
				style={{ marginRight: "0.5rem" }}
			>
				{QUIZ_ACTION_SUBMIT}
			</Button>
			<div>
				<Button
					disabled={selectedQuestion === 0}
					onClick={() => setSelectedQuestion(idx => idx - 1)}
					variant="outlined"
					style={{ margin: "0 0.5rem" }}
				>
					{QUIZ_ACTION_PREVIOUS}
				</Button>
				<Button
					disabled={selectedQuestion === quiz.questions.length - 1}
					variant="outlined"
					onClick={() => setSelectedQuestion(idx => idx + 1)}
					style={{ marginLeft: "0.5rem" }}
				>
					{QUIZ_ACTION_NEXT}
				</Button>
			</div>
		</div>
	);

	const renderQuestion = () => {
		const { question, options, quesID } = quiz.questions[selectedQuestion];
		const selectedOptionID = submittedAnswers[quesID];
		return (
			<div className={`question${toggleQuestionList ? " disable-container" : ""}`}>
				<div className="question-detail">
					<div style={{ marginBottom: "2rem" }}>{QUIZ_QUESTION_HEADER}</div>
					{question}
				</div>
				<div className="question-options">
					<div style={{ marginBottom: "0.5rem" }}>{QUIZ_ANSWER_HEADER}</div>
					{options && options.length > 0 ? (
						options.map(({ answer, optionID }) => (
							<div
								key={optionID}
								className={`answer${
									optionID === selectedOptionID ? " selected" : ""
								}`}
								onClick={() => handleOptionSelection(quesID, optionID)}
							>
								{answer}
							</div>
						))
					) : (
						<div>{QUIZ_NO_OPTIONS_FALLBACK}</div>
					)}
				</div>
				{renderQuestionActions()}
			</div>
		);
	};

	return (
		<>
			<div className="quiz-head">
				<div className="quiz-name">
					<div className={`ham-wrap${showUserForm ? " hide" : " show"}`}>
						<Hamburger toggle={() => setToggleQuestionsList(toggle => !toggle)} />
					</div>
					{quiz.quizName}
				</div>
				<Button
					onClick={() => history.goBack()}
					variant="outlined"
					style={{ margin: "0 0.5rem" }}
				>
					{QUIZ_TO_QUIZES_BUTTON}
				</Button>
			</div>
			<hr />
			{showUserForm ? (
				<UserForm handleFormSubmition={handleQuizSubmition} />
			) : (
				<div className="quiz-container">
					{Object.values(quiz).length > 0 ? (
						<>
							{renderQuestionsList()}
							{renderQuestion()}
						</>
					) : (
						<div>{LOADING}</div>
					)}
				</div>
			)}
		</>
	);
};

export default Quiz;
