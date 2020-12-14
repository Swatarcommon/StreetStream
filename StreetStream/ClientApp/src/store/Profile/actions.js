import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {changeIsLogged, refreshToken, setRole} from "../App/actions";
const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");
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
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
                const profile = response.data;
                dispatch(fetchProfileSuccess(profile[0]));
            }).catch(error => {
                console.log(error.response.status);
                if(error.response.status === 401){
                    dispatch(fetchProfileFailure());
                    dispatch(refreshToken());
                }else {
                    dispatch(fetchProfileFailure("Some Error"));
                }
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