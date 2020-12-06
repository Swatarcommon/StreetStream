import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {changeIsLogged, setRole} from "../App/actions";
import {resetErrors} from "../Authorization/actions";

const logOutUser = () => {
    return {
        type: 'LOG_OUT',
    }
}

const fetchProfileRequest = () => {
    return {
        type: 'FETCH_PROFILE_REQUEST'
    }
}

const fetchProfileSuccess = (events) => {
    return {
        type: 'FETCH_PROFILE_SUCCESS',
        payload: events
    }
}

const fetchProfileFailure = (error) => {
    return {
        type: 'FETCH_PROFILE_FAILURE',
        payload: error
    }
}

export const fetchProfile = () => {
    return (dispatch) => {
        dispatch(fetchProfileRequest());
        axios.get(SERVER_URL + '/api/accounts/profile', {
            mode: 'no-cors',
        })
            .then(response => {
                const profile = response.data;
                dispatch(fetchProfileSuccess(profile[0]));
            }).catch(error => {
            dispatch(fetchProfileFailure(error.message));
            dispatch(setRole(""));
            logOut();
        });
    }
}
export const logOut = (account, token) => {
    return (dispatch) => {
        dispatch(logOutUser());
        dispatch(changeIsLogged(false));
        dispatch(setRole(""));
        window.localStorage.removeItem("isLogged");
        window.sessionStorage.removeItem("access_token");
    }
}