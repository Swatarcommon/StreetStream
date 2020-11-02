const defaultState = {
    loading: false,
    events: [],
    errorMsg: ''
};

export const fetchDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_EVENTS_REQUEST':
            return {...state, loading: true}
        case 'FETCH_EVENTS_SUCCESS':
            return {...state, loading: false, events: action.payload, errorMsg: ''}
        case 'FETCH_EVENTS_FAILURE':
            return {...state, loading: false, events: [], errorMsg: action.payload}
        default:
            return state;
    }
};