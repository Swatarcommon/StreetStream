import {combineReducers} from "redux";
import {appReducer} from "./App/reducer";
import {fetchDataReducer} from "./EventsList/reducer";
import {mapReducer} from "./Map/reducer";

export default combineReducers({
    app: appReducer,
    fetchdata: fetchDataReducer,
    map: mapReducer
});