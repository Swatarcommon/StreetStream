import {combineReducers} from "redux";
import {appReducer} from "./App/reducer";
import {fetchDataReducer} from "./EventsList/reducer";
import {mapReducer} from "./Map/reducer";
import {authorizationReducer} from "./Authorization/reducer";
import {profileReducer} from "./Profile/reducer";
import {eventReducer} from "./Event/reducer";
import {fetchAccountsReducer} from "./CommercalAccountsList/reducer";
import {commercialAccountReducer} from "./CommercialAccount/reducer";

export default combineReducers({
    app: appReducer,
    fetchdata: fetchDataReducer,
    event: eventReducer,
    map: mapReducer,
    authorization: authorizationReducer,
    profile: profileReducer,
    commercialaccounts: fetchAccountsReducer,
    commercialaccount: commercialAccountReducer
});