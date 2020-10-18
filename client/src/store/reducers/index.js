import { combineReducers } from "redux";
import quizesReducer from "./quizesReducer";
import usersReducer from "./usersReducer";

export default combineReducers({ quizes: quizesReducer, users: usersReducer });
