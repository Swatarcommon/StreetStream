import axios from "axios";
import {SERVER_URL} from "../../config.json";

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

export const fetchPlacemarks = () => {
    return (dispatch) => {
        dispatch(fetchPlacemarksRequest());
        axios.get(SERVER_URL + '/api/placemarks?offset=0&maxid=100&orderByFields=y&desc=false', {
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