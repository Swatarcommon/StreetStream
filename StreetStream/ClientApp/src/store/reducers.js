import {combineReducers} from "redux";
import {appReducer} from "./App/reducer";
import {fetchDataReducer} from "./EventsList/reducer";
import {mapReducer} from "./Map/reducer";
import {authorizationReducer} from "./Authorization/reducer";
import {profileReducer} from "./Profile/reducer";

export default combineReducers({
    app: appReducer,
    fetchdata: fetchDataReducer,
    map: mapReducer,
    authorization: authorizationReducer,
    profile: profileReducer
});