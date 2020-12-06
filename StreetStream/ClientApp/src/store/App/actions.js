import {resetErrors} from "../Authorization/actions";
import axios from "axios";
import {SERVER_URL} from "../../config.json";
axios.defaults.withCredentials = true;
export const changeIsLogged = (flag) => {
    return {
        type: 'CHANGE_ISLOGGED',
        payload: flag
    }
}

export const setRole = (role) => {
    return {
        type: 'SET_ROLE',
        payload: role
    }
}

const isLogginCheckRequest = () => {
    return {
        type: 'FETCH_IS_LOGGIN_CHECK_REQUEST'
    }
}

const isLogginCheckSuccess = () => {
    return {
        type: 'FETCH_IS_LOGGIN_CHECK_SUCCESS'
    }
}

const isLogginCheckFailure = () => {
    return {
        type: 'FETCH_IS_LOGGIN_CHECK_FAILURE',
    }
}

export const isLogginCheck = () => {
    return (dispatch) => {
        console.log('APP TOKEN = ', window.sessionStorage.getItem("access_token"));
        dispatch(isLogginCheckRequest());
        axios.get(SERVER_URL + '/api/accounts/isloggin', {
                headers: {
                    authorization: 'Bearer ' + window.sessionStorage.getItem("access_token")
                }
            }
        ).then(response => {
            dispatch(isLogginCheckSuccess());
        }).catch(error => {
            dispatch(isLogginCheckFailure());
        });
    }
}