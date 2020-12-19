import axios from "axios";
import {SERVER_URL} from "../../config.json";
import 'bootstrap/dist/css/bootstrap.css';
import {isLogginCheck} from "../App/actions";

export const setZoom = (currentZoom) => {
    return {
        type: 'SET_ZOOM',
        payload: currentZoom
    }
}

export const setPosition = (placemark) => {
    return {
        type: 'SET_POSITION',
        payload: [placemark.x, placemark.y]
    }
}

const fetchPlacemarksRequest = () => {
    return {
        type: 'FETCH_PLACEMARKS_REQUEST'
    }
}

const fetchPlacemarksSuccess = (placemarks) => {
    return {
        type: 'FETCH_PLACEMARKS_SUCCESS',
        payload: placemarks
    }
}

const fetchPlacemarksFailure = (error) => {
    return {
        type: 'FETCH_PLACEMARKS_FAILURE',
        payload: error
    }
}

const fetchAddEventRequest = () => {
    return {
        type: 'FETCH_ADD_EVENT_REQUEST'
    }
}

const fetchAddEventSuccess = () => {
    return {
        type: 'FETCH_ADD_EVENT_SUCCESS'
    }
}

const fetchAddEventFailure = (error) => {
    return {
        type: 'FETCH_ADD_EVENT_FAILURE'
    }
}

const fetchCategroiesRequest = () => {
    return {
        type: 'FETCH_CATEGORIES_REQUEST'
    }
}

const fetchCategroiesSuccess = (categories) => {
    return {
        type: 'FETCH_CATEGORIES_SUCCESS',
        payload: categories
    }
}

const fetchCategroiesFailure = (error) => {
    return {
        type: 'FETCH_CATEGORIES_FAILURE'
    }
}

export const fetchPlacemarks = () => {
    return (dispatch) => {
        dispatch(fetchPlacemarksRequest());
        axios.get(SERVER_URL + '/api/placemarks?offset=0&maxid=10000000&orderByFields=y&desc=false&includingProps=event,commercialaccount', {
            mode: 'no-cors',
        })
            .then(response => {
                const placemarks = response.data;
                dispatch(fetchPlacemarksSuccess(placemarks));
            }).catch(error => {
            dispatch(fetchPlacemarksFailure(error.message));
        });
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategroiesRequest());
        axios.get(SERVER_URL + '/api/categories?offset=0&maxid=100000', {
            mode: 'no-cors',
        })
            .then(response => {
                const categories = response.data;
                dispatch(fetchCategroiesSuccess(categories));
            }).catch(error => {
            dispatch(fetchCategroiesFailure(error.message));
        });
    }
}

export const fetchAddEvent = (event) => {
    console.log(event);
    return (dispatch) => {
        dispatch(fetchAddEventRequest());
        axios.post(SERVER_URL + '/api/events', {
            name: event.Name,
            date: event.Date,
            duration: event.Duration,
            placemark: event.placemark,
            description: event.Description,
            categoryevent: event.CategoryEvent
        })
            .then(response => {
                const event = response.data;
                dispatch(fetchAddEventSuccess(event));
            }).catch(error => {
            dispatch(fetchAddEventFailure(error.message));
        });
    }
}

export const openHintMenu = (map) => {
    window.sessionStorage.setItem('coords_to_add', map.get('coords'));
    return (dispatch) => {
        map.originalEvent.map.hint.open(map.get('coords'), '' +
            '<button id="hint-add-event" class="btn btn-block btn-outline-dark btn-sm" ' +
            'onClick={document.getElementById("eventaddformcontainer").classList.remove("disable");}>Add event</button>'
        );
        dispatch(isLogginCheck());
    }
}