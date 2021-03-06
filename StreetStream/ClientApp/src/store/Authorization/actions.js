import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {changeIsLogged, setRole} from "../App/actions";

const signUpRequest = () => {
    return {
        type: 'FETCH_SIGNUP_REQUEST'
    }
}

const signUpSuccess = (accountInfo) => {
    return {
        type: 'FETCH_SIGNUP_SUCCESS',
        payload: accountInfo
    }
}

const signUpFailure = (error) => {
    return {
        type: 'FETCH_SIGNUP_FAILURE',
        payload: error
    }
}
const logInRequest = () => {
    return {
        type: 'FETCH_LOGIN_REQUEST'
    }
}

const logInSuccess = () => {
    return {
        type: 'FETCH_LOGIN_SUCCESS'
    }
}

const logInFailure = (error) => {
    return {
        type: 'FETCH_LOGIN_FAILURE',
        payload: error
    }
}

export const resetErrors = () => {
    return {
        type: 'RESET_ERRORS',
        payload: ''
    }
}

export const setAccountType = (type) => {
    return {
        type: 'SET_ACCOUNT_TYPE',
        payload: type + "ACCOUNT"
    }
}

export const signUpByCommercial = (account, token) => {
    return (dispatch) => {
        dispatch(signUpRequest());
        axios.post(SERVER_URL + '/api/commercialaccounts', {
            account: {
                email: account.email,
                password: account.password,
                description: account.description,
                name: account.name,
                telephone: account.telephone
            },
            token: token
        }, {
            mode: 'no-cors',
        }).then(response => {
            const accountInfo = response.data;
            dispatch(signUpSuccess(accountInfo));
            window.location.href = '/';
        }).catch(error => {
            dispatch(signUpFailure(error.response.data.errorMsg));
            setTimeout(() => {
                dispatch(resetErrors());
            }, 5000);
        });
    }
}

export const signUpByRegular = (account, token) => {
    return (dispatch) => {
        dispatch(signUpRequest());
        axios.post(SERVER_URL + '/api/regularaccounts', {
            account: {
                email: account.email,
                password: account.password,
                name: account.name
            },
            token: token
        }, {
            mode: 'no-cors',
        }).then(response => {
            const accountInfo = response.data;
            dispatch(signUpSuccess(accountInfo));
            window.location.href = '/';
        }).catch(error => {
            dispatch(signUpFailure(error.response.data.errorMsg));
            setTimeout(() => {
                dispatch(resetErrors());
            }, 5000);
        });
    }
}


export const logIn = (account, token) => {
    return (dispatch) => {
        dispatch(logInRequest());
        axios.post(SERVER_URL + '/api/accounts/authenticate', {
            email: account.email,
            password: account.password
        }, {
            mode: 'no-cors',
        }).then(response => {
            const authInfo = response.data;
            dispatch(logInSuccess());
            dispatch(changeIsLogged(true));
            dispatch(setRole(authInfo));
            window.localStorage.setItem("isLogged", true);
            window.localStorage.setItem("user_id", authInfo.id);
            window.localStorage.setItem("role", authInfo.type);
            window.localStorage.setItem("access_token", authInfo.jwtToken);
        }).catch(error => {
            if (error.response !== undefined && error.response.data.errorMsg !== undefined)
                dispatch(logInFailure(error.response.data.errorMsg));
            else
                dispatch(logInFailure("Uknown error :("));
            setTimeout(() => {
                dispatch(resetErrors());
            }, 5000);
        });
    }
}