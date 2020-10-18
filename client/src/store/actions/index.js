import axios from "axios";
import history from "../../history";
import {
	FETCH_ALL_QUIZES,
	FETCH_QUIZ,
	POST_QUIZ,
	SUBMIT_QUIZ,
	FETCH_ALL_USERS,
	UPDATE_QUIZ
} from "./types";

export const fetchAllQuizes = () => async dispatch => {
	try {
		const response = await axios.get("/api/quizes");
		dispatch({ type: FETCH_ALL_QUIZES, payload: response.data });
	} catch (err) {
		console.log("error while fetching all quizes:", err);
	}
};

export const fetchQuiz = quizID => async dispatch => {
	try {
		const response = await axios.get(`/api/quizes?id=${quizID}`);
		dispatch({ type: FETCH_QUIZ, payload: response.data[0] });
	} catch (err) {
		console.log("error while fetching Quiz:", err);
	}
};

export const createQuiz = quizValues => async dispatch => {
	try {
		const response = await axios.post("/api/quizes", { ...quizValues });
		dispatch({ type: POST_QUIZ, payload: response.data });
		history.push("/admin");
	} catch (err) {
		console.log("error while posting quiz:", err);
	}
};

//will update quizes objects takenBy array after user submits the quiz
export const updateQuiz = (quizID, userID) => async (dispatch, getState) => {
	try {
		const quizes = getState().quizes;
		const currentQuiz = Object.values(quizes).find(quiz => quiz.id === quizID);
		if (currentQuiz) {
			const takenBy = [...(currentQuiz.takenBy || []), userID];
			const response = await axios.patch(`/api/quizes/${quizID}`, { takenBy });
			dispatch({ type: UPDATE_QUIZ, payload: response.data });
		}
	} catch (err) {
		console.log("error while updating quize:", err);
	}
};

export const submitQuiz = quizAnswers => async (dispatch, getState) => {
	try {
		const { name, number, quiz } = quizAnswers;
		const users = getState().users;
		const existingUser = Object.values(users).find(user => user.number === number);
		let response;
		if (existingUser) {
			const updatedQuizTaken = existingUser.quizesTaken.filter(
				qz => qz.quizID !== quiz.quizID
			);
			response = await axios.patch(`/api/users/${existingUser.id}`, {
				quizesTaken: [...updatedQuizTaken, { ...quiz }]
			});
		} else {
			response = await axios.post("/api/users", { name, number, quizesTaken: [quiz] });
		}

		dispatch(updateQuiz(quiz.quizID, response.data.id));
		dispatch({ type: SUBMIT_QUIZ, payload: response.data });
		history.push("/user");
	} catch (err) {
		console.log("error while submitting quiz:", err);
	}
};

export const fetchAllUsers = () => async dispatch => {
	try {
		const response = await axios.get("/api/users");
		dispatch({ type: FETCH_ALL_USERS, payload: response.data });
	} catch (err) {
		console.log("error while fetchng all users:", err);
	}
};
