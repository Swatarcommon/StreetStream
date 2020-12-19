const defaultState = {
    center: [53.902284, 27.561831],
    zoom: 17,
    placeMarks: [],
    categories: []
};

export const mapReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_ZOOM':
            return {...state, zoom: (action.payload === 9 ? 12 : 9)}
        case 'SET_POSITION':
            return {...state, center: action.payload}
        case 'FETCH_PLACEMARKS_REQUEST':
            return {...state}
        case 'FETCH_PLACEMARKS_SUCCESS':
            return {...state, placeMarks: action.payload, errorMsg: ''}
        case 'FETCH_PLACEMARKS_FAILURE':
            return {...state, errorMsg: action.payload}
        case 'FETCH_CATEGORIES_REQUEST':
            return {...state}
        case 'FETCH_CATEGORIES_SUCCESS':
            return {...state, categories: action.payload, errorMsg: ''}
        case 'FETCH_CATEGORIES_FAILURE':
            return {...state, errorMsg: action.payload}
        default:
            return state;
    }
};