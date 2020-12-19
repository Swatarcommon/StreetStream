import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {refreshToken} from "../App/actions";

const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");

const fetchCommercialAccountRequest = () => {
    return {
        type: 'FETCH_COMMERCIAL_ACCOUNT_REQUEST'
    }
}

const fetchCommercialAccountSuccess = (commercialaccount) => {
    return {
        type: 'FETCH_COMMERCIAL_ACCOUNT_SUCCESS',
        payload: commercialaccount
    }
}

const fetchCommercialAccountFailure = (error) => {
    return {
        type: 'FETCH_COMMERCIAL_ACCOUNT_FAILURE',
        payload: error
    }
}
const fetchSubscribeRequest = () => {
    return {
        type: 'FETCH_SUBSCRIBE_REQUEST'
    }
}

const fetchSubscribeSuccess = (flag) => {
    return {
        type: 'FETCH_SUBSCRIBE_SUCCESS',
        payload: flag
    }
}

const fetchSubscribeFailure = (error) => {
    return {
        type: 'FETCH_SUBSCRIBE_FAILURE',
        payload: error
    }
}


export const fetchCommercialAccount = (id) => {
    return (dispatch) => {
        dispatch(fetchCommercialAccountRequest());
        axios.get(SERVER_URL + `/api/commercialaccounts/${id}`, {
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
            const commercialaccount = response.data;
            console.log(commercialaccount);
            dispatch(fetchCommercialAccountSuccess(commercialaccount));
        }).catch(error => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                dispatch(fetchCommercialAccountFailure());
                dispatch(refreshToken());
            } else {
                dispatch(fetchCommercialAccountFailure("Some Error"));
            }
        });
    }
}

export const subscribe = (id) => {
    return (dispatch) => {
        dispatch(fetchSubscribeRequest());
        axios.get(SERVER_URL + `/api/accounts/subscribe/${id}`, {
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
            const commercialaccount = response.data;
            console.log(commercialaccount);
            dispatch(fetchSubscribeSuccess(true));
            window.location.reload();
        }).catch(error => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                dispatch(fetchSubscribeFailure());
                dispatch(refreshToken());
            } else {
                dispatch(fetchSubscribeFailure("Some Error"));
            }
        });
    }
}

export const unSubscribe = (id) => {
    return (dispatch) => {
        dispatch(fetchSubscribeRequest());
        axios.get(SERVER_URL + `/api/accounts/unsubscribe/${id}`, {
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
            const commercialaccount = response.data;
            console.log(commercialaccount);
            dispatch(fetchSubscribeSuccess(false));
            window.location.reload();
        }).catch(error => {
            console.log(error.response.status);
            if (error.response.status === 401) {
                dispatch(fetchSubscribeFailure());
                dispatch(refreshToken());
            } else {
                dispatch(fetchSubscribeFailure("Some Error"));
            }
        });
    }
}