import axios from "axios";
import {SERVER_URL} from "../../config.json";

axios.defaults.withCredentials = true;
const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");

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
const refreshTokenRequest = () => {
    return {
        type: 'REFRESH_TOKEN_REQUEST'
    }
}

const refreshTokenSuccess = () => {
    return {
        type: 'REFRESH_TOKEN_SUCCESS'
    }
}

const refreshTokenFailure = () => {
    return {
        type: 'REFRESH_TOKEN_FAILURE',
    }
}

export const isLogginCheck = () => {
    return (dispatch) => {
        console.log('isLogginCheck TOKEN = ', TOKEN);
        dispatch(isLogginCheckRequest());
        axios.get(SERVER_URL + '/api/accounts/isloggin', {
                headers: {
                    authorization: TOKEN
                }
            }
        ).then(response => {
            dispatch(isLogginCheckSuccess());
        }).catch(error => {
            dispatch(refreshToken());
        });
    }
}

export const refreshToken = () => {
    return (dispatch) => {
        dispatch(refreshTokenRequest());
        axios.post(SERVER_URL + '/api/accounts/refresh-token', {}
        ).then(response => {
            const authInfo = response.data;
            dispatch(refreshTokenSuccess());
            console.log('refreshToken TOKEN = ', authInfo.jwtToken);
            console.log('refreshToken TYPE = ', authInfo.type);
            dispatch(changeIsLogged(true));
            dispatch(setRole(authInfo));
            window.localStorage.setItem("isLogged", true);
            window.localStorage.setItem("role", authInfo.type);
            window.localStorage.setItem("user_id", authInfo.id);
            window.localStorage.setItem("access_token", authInfo.jwtToken);
            window.location.reload();
        }).catch(error => {
            dispatch(refreshTokenFailure());
            dispatch(setRole({role: "", id: undefined})); //new added
            dispatch(changeIsLogged(false));
            window.localStorage.removeItem("isLogged");
            window.localStorage.removeItem("user_id");
            window.localStorage.removeItem("role");
            window.localStorage.removeItem("access_token");
        });
    }
}