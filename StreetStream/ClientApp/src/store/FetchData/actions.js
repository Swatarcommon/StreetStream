import axios from "axios";
import {SERVER_URL} from "../../config.json";

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
            mode: 'no-cors',
        })
            .then(response => {
                const events = response.data;
                dispatch(fetchEventsSuccess(events));
            }).catch(error => {
            dispatch(fetchEventsFailure(error.message));
        });
    }
}