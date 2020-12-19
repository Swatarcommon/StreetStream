const defaultState = {
    profileInfo: {},
    loading: false,
    subscribed: false
};

export const commercialAccountReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOG_OUT':
            return {...state}
        case 'FETCH_COMMERCIAL_ACCOUNT_REQUEST':
            return {...state, loading: true}
        case 'FETCH_COMMERCIAL_ACCOUNT_SUCCESS':
            return {...state, profileInfo: action.payload, loading: false}
        case 'FETCH_COMMERCIAL_ACCOUNT_FAILURE':
            return {...state, loading: false}
        case 'FETCH_SUBSCRIBE_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUBSCRIBE_SUCCESS':
            return {...state, subscribed: action.payload, loading: false}
        case 'FETCH_SUBSCRIBE_FAILURE':
            return {...state, loading: false}
        default:
            return state;
    }
};