const defaultState = {
    loading: false,
    accountInfo: {},
    errorMsg: ''
};

export const authorizationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_SIGNUP_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SIGNUP_SUCCESS':
            return {...state, loading: false, accountInfo: action.payload, errorMsg: ''}
        case 'FETCH_SIGNUP_FAILURE':
            return {...state, loading: false, accountInfo: {}, errorMsg: action.payload}
        case 'FETCH_VERIFICATION_CODE_REQUEST':
            return {...state}
        case 'FETCH_VERIFICATION_CODE_REQUEST':
            return {...state, errorMsg: ''}
        case 'FETCH_VERIFICATION_CODE_FAILURE':
            return {...state, errorMsg: action.payload}
        default:
            return state;
    }
};