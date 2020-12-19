import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {refreshToken} from "../App/actions";

const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");

const fetchAccountsRequest = () => {
    return {
        type: 'FETCH_ACCOUNTS_REQUEST'
    }
}

const fetchAccountsSuccess = (accounts) => {
    return {
        type: 'FETCH_ACCOUNTS_SUCCESS',
        payload: accounts
    }
}

const fetchAccountsFailure = (error) => {
    return {
        type: 'FETCH_ACCOUNTS_FAILURE',
        payload: error
    }
}

export const fetchAccounts = () => {
    return (dispatch) => {
        dispatch(fetchAccountsRequest());
        axios.get(SERVER_URL + '/api/Commercialaccounts?includingProps=commercialaccount,placemark', {
            headers: {
                authorization: TOKEN
            }
        })
            .then(response => {
                const accounts = response.data;
                console.log("FETCH ACCOUNT DATA ", accounts)
                dispatch(fetchAccountsSuccess(accounts));
            }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    dispatch(fetchAccountsFailure("Unauthorized"));
                    dispatch(refreshToken());
                } else {
                    dispatch(fetchAccountsFailure(error.message));
                }
            }
            dispatch(fetchAccountsFailure("Uknown error :("));
        });
    }
}

export const fetchAccountsById = (id) => {
    return (dispatch) => {
        dispatch(fetchAccountsRequest());
        axios.get(SERVER_URL + `/api/events/${id}?includingProps=commercialaccount,placemark`, {
            headers: {
                authorization: TOKEN
            }
        })
            .then(response => {
                const events = response.data;
                events.map(event => event.date = (event.date.split('T'))[0]);
                dispatch(fetchAccountsSuccess(events));
            }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    dispatch(fetchAccountsFailure("Unauthorized"));
                    dispatch(refreshToken());
                } else {
                    dispatch(fetchAccountsFailure(error.message));
                }
            }
            dispatch(fetchAccountsFailure("Uknown error :("));
        });
    }
}