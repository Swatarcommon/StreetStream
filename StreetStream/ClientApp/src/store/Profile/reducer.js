const defaultState = {
    profileInfo: {},
    loading: false
};

export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOG_OUT':
            return {...state}
        case 'FETCH_PROFILE_REQUEST':
            return {...state, loading: true}
        case 'FETCH_PROFILE_SUCCESS':
            return {...state, profileInfo: action.payload, loading: false}
        case 'FETCH_PROFILE_FAILURE':
            return {...state, loading: false}
        default:
            return state;
    }
};