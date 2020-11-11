import axios from "axios";
import {SERVER_URL} from "../../config.json";

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

export const resetErrors = () => {
    return {
        type: 'RESET_ERRORS',
        payload: ''
    }
}

export const signUp = (account, token) => {
    return (dispatch) => {
        dispatch(signUpRequest());
        axios.post(SERVER_URL + '/api/commercialaccounts', {
            account: {
                email: account.email,
                password: account.password
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