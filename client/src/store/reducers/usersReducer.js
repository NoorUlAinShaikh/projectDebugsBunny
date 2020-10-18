import { mapKeys } from "lodash";
import { SUBMIT_QUIZ, FETCH_ALL_USERS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SUBMIT_QUIZ:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_ALL_USERS:
			return { ...state, ...mapKeys(action.payload, "id") };
		default:
			return state;
	}
};
