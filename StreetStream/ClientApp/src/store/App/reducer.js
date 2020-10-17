const defaultState = {
    isLogged: false,
};

export const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_ISLOGGED_TRUE':
            return {...state, isLogged: action.payload}
    }
    return state;
};