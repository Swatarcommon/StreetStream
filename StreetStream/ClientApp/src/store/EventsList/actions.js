import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {refreshToken} from "../App/actions";

const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");
const fetchEventsRequest = () => {
    return {
        type: 'FETCH_EVENTS_REQUEST'
    }
}

const fetchEventsSuccess = (events) => {
    return {
        type: 'FETCH_EVENTS_SUCCESS',
        payload: events
    }
}

const fetchEventsFailure = (error) => {
    return {
        type: 'FETCH_EVENTS_FAILURE',
        payload: error
    }
}

export const fetchEvents = () => {
    return (dispatch) => {
        dispatch(fetchEventsRequest());
        axios.get(SERVER_URL + '/api/events?includingProps=commercialaccount,placemark', {
            headers: {
                authorization: TOKEN
            }
        })
            .then(response => {
                const events = response.data;
                events.map(event => event.date = (event.date.split('T'))[0]);
                dispatch(fetchEventsSuccess(events));
            }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    dispatch(fetchEventsFailure("Unauthorized"));
                    dispatch(refreshToken());
                } else {
                    dispatch(fetchEventsFailure(error.message));
                }
            }
            dispatch(fetchEventsFailure("Uknown error :("));
        });
    }
}

export const fetchEventsById = (id) => {
    return (dispatch) => {
        dispatch(fetchEventsRequest());
        axios.get(SERVER_URL + `/api/events/${id}?includingProps=commercialaccount,placemark`, {
            headers: {
                authorization: TOKEN
            }
        })
            .then(response => {
                const events = response.data;
                events.map(event => event.date = (event.date.split('T'))[0]);
                dispatch(fetchEventsSuccess(events));
            }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    dispatch(fetchEventsFailure("Unauthorized"));
                    dispatch(refreshToken());
                } else {
                    dispatch(fetchEventsFailure(error.message));
                }
            }
            dispatch(fetchEventsFailure("Uknown error :("));
        });
    }
}