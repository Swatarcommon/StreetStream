import axios from "axios";
import {SERVER_URL} from "../../config.json";

const signUpRequest = () => {
    return {
        type: 'FETCH_SIGNUP_REQUEST'
    }
}

const signUpSuccess = (accountInfo) => {
    return {
        type: 'FETCH_SIGNUP_REQUEST',
        payload: accountInfo
    }
}

const signUpFailure = (error) => {
    return {
        type: 'FETCH_SIGNUP_FAILURE',
        payload: error
    }
}

export const signUp = (account, code) => {
    return (dispatch) => {
        dispatch(signUpRequest());
        axios.post(SERVER_URL + '/api/commercialaccounts', {
            email: account.email,
            password: account.password,
            verificationCode: account.verificationCode
        }, {
            mode: 'no-cors',
        })
            .then(response => {
                const accountInfo = response.data;
                dispatch(signUpSuccess(accountInfo));
            }).catch(error => {
            dispatch(signUpFailure(error.message));
        });
    }
}


const verificationCodeRequest = () => {
    return {
        type: 'FETCH_VERIFICATION_CODE_REQUEST'
    }
}

const verificationCodeSuccess = () => {
    return {
        type: 'FETCH_VERIFICATION_CODE_REQUEST',
    }
}

const verificationCodeFailure = (error) => {
    return {
        type: 'FETCH_VERIFICATION_CODE_FAILRUE',
        payload: error
    }
}

export const sendVerificationCode = (account) => {
    return (dispatch) => {
        dispatch(verificationCodeRequest());
        axios.post(SERVER_URL + '/api/confirmemail', {
            email: account.email,
            password: account.password,
        }, {
            mode: 'no-cors',
        })
            .then(response => {
                dispatch(verificationCodeSuccess());
            }).catch(error => {
            dispatch(verificationCodeFailure(error.message));
        });
    }
}