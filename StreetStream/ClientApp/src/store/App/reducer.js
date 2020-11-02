const defaultState = {
    isLogged: false,
};

export const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_ISLOGGED':
            return {...state, isLogged: action.payload}
        default:
            return state;
    }
};