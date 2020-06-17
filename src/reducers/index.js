import { combineReducers } from "redux";
import { helperLogin } from "./helperLogin";
import { studentLogin } from "./studentLogin"

export default combineReducers({
    helperLogin,
    studentLogin,
});