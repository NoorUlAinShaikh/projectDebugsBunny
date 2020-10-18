import { mapKeys } from "lodash";
import { FETCH_QUIZ, FETCH_ALL_QUIZES, POST_QUIZ, UPDATE_QUIZ } from "../actions/types";
const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ALL_QUIZES:
			return { ...state, ...mapKeys(action.payload, "id") };
		case FETCH_QUIZ:
		case POST_QUIZ:
		case UPDATE_QUIZ:
			return { ...state, [action.payload.id]: action.payload };
		default:
			return state;
	}
};
