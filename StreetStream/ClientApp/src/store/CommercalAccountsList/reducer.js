const defaultState = {
    loading: false,
    accounts: [],
    errorMsg: ''
};

export const fetchAccountsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_ACCOUNTS_REQUEST':
            return {...state, loading: true}
        case 'FETCH_ACCOUNTS_SUCCESS':
            return {...state, loading: false, accounts: action.payload, errorMsg: ''}
        case 'FETCH_ACCOUNTS_FAILURE':
            return {...state, loading: false, accounts: [], errorMsg: action.payload}
        default:
            return state;
    }
};