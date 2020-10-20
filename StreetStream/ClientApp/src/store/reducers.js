import {combineReducers} from "redux";
import {appReducer} from "./App/reducer";
import {fetchDataReducer} from "./FetchData/reducer";

export default combineReducers({
    app: appReducer,
    fetchdata: fetchDataReducer
});