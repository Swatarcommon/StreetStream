const defaultState = {
    center: [53.902284, 27.561831],
    zoom: 9,
    placeMarks:[]
};

export const mapReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_ZOOM':
            return {...state, zoom: (action.payload === 9 ? 12 : 9)}
        case 'SET_POSITION':
            return {...state, center: action.payload}
        case 'FETCH_PLACEMARKS_REQUEST':
            return {...state, loading: true}
        case 'FETCH_PLACEMARKS_SUCCESS':
            return {...state, loading: false, placeMarks: action.payload, errorMsg: ''}
        case 'FETCH_PLACEMARKS_FAILURE':
            return {...state, loading: false, forecasts: [], errorMsg: action.payload}
        default:
            return state;
    }
};