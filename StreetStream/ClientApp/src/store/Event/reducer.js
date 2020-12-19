const defaultState = {
    event: {},
    placemark: {},
    categoryEvent: [],
    commercialAccount: {},
    loading: false,
    modalIsOpen: false
};

export const eventReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_EVENTS_BY_ID_REQUEST':
            return {...state, loading: true}
        case 'FETCH_EVENTS_BY_ID_SUCCESS':
            return {
                ...state,
                loading: false,
                event: action.payload,
                placemark: action.payload.placemark,
                commercialAccount: action.payload.commercialAccount,
                categoryEvent: action.payload.categoryEvent,
                errorMsg: ''
            }
        case 'FETCH_EVENTS_BY_ID_FAILURE':
            return {...state, loading: false, event: {}, errorMsg: action.payload}
        case 'FETCH_UPDATE_EVENT_REQUEST':
            return {...state, loading: true}
        case 'FETCH_UPDATE_EVENT_SUCCESS':
            return {
                ...state,
                loading: false,
                event: action.payload,
                errorMsg: ''
            }
        case 'FETCH_UPDATE_EVENT_FAILURE':
            return {...state, loading: false, errorMsg: action.payload}
        case 'FETCH_DELETE_EVENT_REQUEST':
            return {...state, loading: true}
        case 'FETCH_DELETE_EVENT_SUCCESS':
            return {
                ...state,
                loading: false,
                errorMsg: ''
            }
        case 'FETCH_DELETE_EVENT_FAILURE':
            return {...state, loading: false, errorMsg: action.payload}
        case 'OPEN_MODAL':
            return {...state, modalIsOpen: action.payload}
        case 'CLOSE_MODAL':
            return {...state, modalIsOpen: action.payload}
        default:
            return state;
    }
};