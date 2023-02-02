import { combineReducers } from "redux";
import LoginReducer from "./reducers/login";
import RegisterReducer from "./reducers/register";      
                                                                                                       
const rootReducer= combineReducers({
    LoginReducer,RegisterReducer
});
export default rootReducer;
