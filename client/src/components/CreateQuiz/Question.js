import React, { useState } from "react";
import { TextField, Button, Checkbox } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import {
	NO_OPTIONS_FALLBACK,
	CORRECT_CHECKBOX_LABEL,
	ANSWER_FIELD_LABEL,
	ADD_OPTIONS_LABEL,
	QUESTION_ACTION_FORM_BACK,
	QUESTION_ACTION_FORM_SUBMIT,
	QUESTION_FORM_HEADER,
	ANSWER_OPTIONS_HEADER
} from "../../helpers/constants";

const Question = ({ addQuestion, setEnableOptionsForm }) => {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const [option, setOption] = useState({ answer: "", correctAnswer: false });

	const handleOptionsUpdate = () => {
		if (option.answer) {
			setOptions(options => [...options, { optionID: uuidv4(), ...option }]);
			setOption({ answer: "", correctAnswer: false });
		}
	};

	const handleQuestionSubmit = () => {
		if (question && options) addQuestion({ quesID: uuidv4(), question, options });
	};

	const renderOptions = () =>
		options && options.length > 0 ? (
			options.map(({ optionID, correctAnswer, answer }) => (
				<div key={optionID} className={`option${correctAnswer ? " correct" : ""}`}>
					{answer}
				</div>
			))
		) : (
			<div className="marginTopBottom1rem">{NO_OPTIONS_FALLBACK}</div>
		);

	const renderOptionsForm = () => (
		<>
			<TextField
				label={ANSWER_FIELD_LABEL}
				value={option.answer}
				variant="outlined"
				onChange={e => setOption({ ...option, answer: e.target.value })}
			></TextField>
			<div>
				<span style={{ marginRight: "0.7rem" }}>{CORRECT_CHECKBOX_LABEL}</span>
				<Checkbox
					checked={option.correctAnswer}
					onChange={e => setOption({ ...option, correctAnswer: e.target.checked })}
				/>
			</div>
			<Button onClick={handleOptionsUpdate} variant="outlined">
				{ADD_OPTIONS_LABEL}
			</Button>
		</>
	);

	const renderQuestionFormActions = () => (
		<>
			<Button onClick={() => setEnableOptionsForm(false)} variant="outlined" className="">
				{QUESTION_ACTION_FORM_BACK}
			</Button>
			<Button
				onClick={handleQuestionSubmit}
				variant="outlined"
				color="secondary"
				className=""
			>
				{QUESTION_ACTION_FORM_SUBMIT}
			</Button>
		</>
	);

	return (
		<div className="questions-form">
			<div className="questions-header"> {QUESTION_FORM_HEADER} </div>
			<hr />
			<div className="answer-details">
				<TextField
					style={{ marginBottom: "1.5rem" }}
					variant="outlined"
					label="Question"
					value={question}
					onChange={e => setQuestion(e.target.value)}
				></TextField>
				<div>
					<div className="options-header"> {ANSWER_OPTIONS_HEADER} </div>
					<hr />
					<div style={{ margin: "0 0 1rem" }}>
						{renderOptions()}
						<div className="options-form">{renderOptionsForm()}</div>
					</div>
				</div>
			</div>
			<div className="questions-form-actions">{renderQuestionFormActions()}</div>
		</div>
	);
};

export default Question;
