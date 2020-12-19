import axios from "axios";
import {SERVER_URL} from "../../config.json";
import {refreshToken} from "../App/actions";

const TOKEN = 'Bearer ' + window.localStorage.getItem("access_token");

const fetchEventsByIdRequest = () => {
    return {
        type: 'FETCH_EVENTS_BY_ID_REQUEST'
    }
}

const fetchEventsByIdSuccess = (event) => {
    return {
        type: 'FETCH_EVENTS_BY_ID_SUCCESS',
        payload: event
    }
}

const fetchEventsByIdFailure = (error) => {
    return {
        type: 'FETCH_EVENTS_BY_ID_FAILURE',
        payload: error
    }
}
const fetchUpdateEventRequest = () => {
    return {
        type: 'FETCH_UPDATE_EVENT_REQUEST'
    }
}

const fetchUpdateEventRequestSuccess = (event) => {
    return {
        type: 'FETCH_UPDATE_EVENT_SUCCESS',
        payload: event
    }
}

const fetchUpdateEventRequestFailure = (error) => {
    return {
        type: 'FETCH_UPDATE_EVENT_FAILURE',
        payload: error
    }
}

const fetchDeleteEventRequest = () => {
    return {
        type: 'FETCH_DELETE_EVENT_REQUEST'
    }
}

const fetchDeleteEventRequestSuccess = () => {
    return {
        type: 'FETCH_DELETE_EVENT_SUCCESS'
    }
}

const fetchDeleteEventRequestFailure = (error) => {
    return {
        type: 'FETCH_DELETE_EVENT_FAILURE',
        payload: error
    }
}

export const openModal = () => {
    return {
        type: 'OPEN_MODAL',
        payload: true
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
        payload: false
    }
}

export const fetchEventById = (id) => {
    return (dispatch) => {
        dispatch(fetchEventsByIdRequest());
        axios.get(SERVER_URL + `/api/events/${id}?includingProps=commercialaccount,placemark,categoryevent,category`, {
            headers: {
                authorization: TOKEN
            }
        })
            .then(response => {
                const event = response.data;
                console.log("event ", event);
                event.date = (event.date.split('T'))[0];
                dispatch(fetchEventsByIdSuccess(event));
            }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    dispatch(fetchEventsByIdFailure("Unauthorized"));
                    dispatch(refreshToken());
                } else {
                    dispatch(fetchEventsByIdFailure(error.message));
                }
            }
            dispatch(fetchEventsByIdFailure("Uknown error :("));
        });
    }
}

export const fetchUpdateEvent = (event) => {
    console.log(event);
    return (dispatch) => {
        dispatch(fetchUpdateEventRequest());
        axios.put(SERVER_URL + '/api/events', {
            id: event.id,
            name: event.Name,
            date: event.Date,
            duration: event.Duration,
            placemark: event.placemark,
            description: event.Description,
            categoryevent: event.CategoryEvent
        }, {
            headers: {
                authorization: TOKEN
            }
        })
            .then(response => {
                const event = response.data;
                event.date = (event.date.split('T'))[0];
                dispatch(fetchUpdateEventRequestSuccess(event));
                dispatch(closeModal());
            }).catch(error => {
            dispatch(fetchUpdateEventRequestFailure(error.message));
        });
    }
}
export const fetchDeleteEvent = (eventId) => {
    console.log("fetchDeleteEvent = ", eventId);
    return (dispatch) => {
        dispatch(fetchDeleteEventRequest());
        axios.delete(SERVER_URL + '/api/events/' + eventId, {
            headers: {
                authorization: TOKEN
            }
        }).then(response => {
            dispatch(fetchDeleteEventRequestSuccess());
            window.location.href = "/events";
        }).catch(error => {
            dispatch(fetchDeleteEventRequestFailure(error.message));
        });
    }
}