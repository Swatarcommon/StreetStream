const defaultState = {
    loading: false,
    forecasts: [],
    errorMsg: ''
};

export const fetchDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_FORECASTS_REQUEST':
            return {...state, loading: true}
        case 'FETCH_FORECASTS_SUCCESS':
            return {...state, loading: false, forecasts: action.payload, errorMsg: ''}
        case 'FETCH_FORECASTS_FAILURE':
            return {...state, loading: false, forecasts: [], errorMsg: action.payload}
        default:
            return state;
    }
};