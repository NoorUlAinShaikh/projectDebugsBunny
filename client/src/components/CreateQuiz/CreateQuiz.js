import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, StepContent, Button, TextField } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import Question from "./Question";
import { createQuiz } from "../../store/actions";
import {
	QUIZ_CREATION_STEPS,
	QUIZ_NAME,
	START_DATE,
	END_DATE,
	CREATE_QUIZ_CONFIRMATION,
	STEPPER_ACTION_ADD,
	STEPPER_ACTION_BACK,
	STEPPER_ACTION_NEXT,
	STEPPER_ACTION_FINISH,
	STEPPER_NO_QUESTIONS_FALLBACK
} from "../../helpers/constants";
import "./CreateQuiz.css";

const CreateQuiz = () => {
	const dispatch = useDispatch();

	const [enableOptionsForm, setEnableOptionsForm] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [quizName, setQuizName] = useState("");
	const [quizStartDate, setQuizStartDate] = useState(new Date());
	const [quizEndDate, setQuizEndDate] = useState(new Date());
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		if (activeStep === 4) {
			const quiz = {
				quizName,
				quizStartDate,
				quizEndDate,
				questionsCount: questions.length,
				questions
			};
			if (quiz) dispatch(createQuiz(quiz));
		}
	}, [activeStep]);

	useEffect(() => {
		setEnableOptionsForm(false);
	}, [questions]);

	const addQuestion = question => {
		if (question) setQuestions(questions => [...questions, { quesID: uuidv4(), ...question }]);
	};

	const renderStepperContent = index => {
		switch (index) {
			case 0:
				return (
					<TextField
						style={{ margin: "1rem" }}
						label={QUIZ_NAME}
						value={quizName}
						onChange={e => setQuizName(e.target.value)}
					></TextField>
				);
			case 1:
				return (
					<div className="quiz-duration-wrap">
						<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
							<DatePicker
								label={START_DATE}
								className="start-date"
								value={quizStartDate}
								onChange={date => setQuizStartDate(date)}
							/>
							<DatePicker
								label={END_DATE}
								className="end-date"
								value={quizEndDate}
								onChange={date => setQuizEndDate(date)}
							/>
						</MuiPickersUtilsProvider>
					</div>
				);
			case 2:
				return questions && questions.length > 0 ? (
					questions.map(({ quesID, question }) => <div key={quesID}>{question}</div>)
				) : (
					<div>{STEPPER_NO_QUESTIONS_FALLBACK}</div>
				);
			case 3:
				return CREATE_QUIZ_CONFIRMATION;
			default:
				return "";
		}
	};

	const renderStepperActions = () => (
		<div className="stepper-actions-wrap">
			{activeStep === 2 && (
				<Button
					onClick={() => setEnableOptionsForm(true)}
					className="stepper-add-question"
					variant="outlined"
				>
					{STEPPER_ACTION_ADD}
				</Button>
			)}
			<Button
				disabled={activeStep === 0}
				onClick={() => setActiveStep(step => step - 1)}
				className="stepper-back"
			>
				{STEPPER_ACTION_BACK}
			</Button>
			<Button
				variant="outlined"
				color="secondary"
				onClick={() => setActiveStep(step => step + 1)}
				className="stepper-next"
			>
				{activeStep === QUIZ_CREATION_STEPS.length - 1
					? `${STEPPER_ACTION_FINISH}`
					: `${STEPPER_ACTION_NEXT}`}
			</Button>
		</div>
	);

	return (
		<div className="create-quiz-wrap">
			<div className={`main-form${enableOptionsForm ? " inactive" : " active"}`}>
				<Stepper activeStep={activeStep} orientation="vertical">
					{QUIZ_CREATION_STEPS.map((step, index) => (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
							<StepContent>
								{renderStepperContent(index)}
								{renderStepperActions()}
							</StepContent>
						</Step>
					))}
				</Stepper>
			</div>
			{enableOptionsForm && (
				<Question addQuestion={addQuestion} setEnableOptionsForm={setEnableOptionsForm} />
			)}
		</div>
	);
};

export default CreateQuiz;
