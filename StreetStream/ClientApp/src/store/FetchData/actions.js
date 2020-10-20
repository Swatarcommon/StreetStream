import axios from "axios";

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
        axios.get('http://localhost:3001/weatherforecast', {
            mode: 'no-cors',
        })
            .then(response => {
                const forecasts = response.data;
                dispatch(fetchForecastsSuccess(forecasts))
            }).catch(error => {
            dispatch(fetchForecastsFailure(error.message));
        });
    }
}