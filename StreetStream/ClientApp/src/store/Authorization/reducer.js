const defaultState = {
    isSignUp: false,
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
        case 'FETCH_LOGIN_REQUEST':
            return {...state, loading: true}
        case 'FETCH_LOGIN_SUCCESS':
            return {...state, loading: false, errorMsg: ''}
        case 'FETCH_LOGIN_FAILURE':
            return {...state, loading: false, accountInfo: {}, errorMsg: action.payload}
        case 'RESET_ERRORS':
            return {...state, loading: false, errorMsg: action.payload}
        default:
            return state;
    }
};