const defaultState = {
    isLogged: (window.localStorage.getItem("isLogged") !== undefined && window.localStorage.getItem("isLogged") !== null)
        ? JSON.parse(window.localStorage.getItem("isLogged"))
        : false,
    role: (window.localStorage.getItem("role") !== undefined && window.localStorage.getItem("role") !== null)
        ? window.localStorage.getItem("role")
        : "",
    id: (window.localStorage.getItem("user_id") !== undefined && window.localStorage.getItem("user_id") !== null)
        ? window.localStorage.getItem("user_id")
        : undefined
};

export const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_ISLOGGED':
            return {...state, isLogged: action.payload}
        case 'FETCH_IS_LOGGIN_CHECK_REQUEST':
            return {...state}
        case 'FETCH_IS_LOGGIN_CHECK_SUCCESS':
            return {...state, isLogged: true}
        case 'REFRESH_TOKEN_REQUEST':
            return {...state}
        case 'REFRESH_TOKEN_SUCCESS':
            return {...state, isLogged: true}
        case 'REFRESH_TOKEN_FAILURE':
            return {...state, isLogged: false}
        case 'SET_ROLE':
            return {...state, role: action.payload.type, id: action.payload.id}
        default:
            return state;
    }
};