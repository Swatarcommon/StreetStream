import axios from "axios";
import {SERVER_URL} from "../../config.json";

const fetchForecastsRequest = () => {
    return {
        type: 'FETCH_FORECASTS_REQUEST'
    }
}

const fetchForecastsSuccess = (forecasts) => {
    return {
        type: 'FETCH_FORECASTS_SUCCESS',
        payload: forecasts
    }
}

const fetchForecastsFailure = (error) => {
    return {
        type: 'FETCH_FORECASTS_FAILURE',
        payload: error
    }
}

export const fetchForecasts = () => {
    return (dispatch) => {
        dispatch(fetchForecastsRequest());
        axios.get(SERVER_URL + '/weatherforecast', {
            mode: 'no-cors',
        })
            .then(response => {
                const forecasts = response.data;
                dispatch(fetchForecastsSuccess(forecasts));
            }).catch(error => {
            dispatch(fetchForecastsFailure(error.message));
        });
    }
}