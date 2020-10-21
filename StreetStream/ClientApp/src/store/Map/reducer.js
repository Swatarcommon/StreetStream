const defaultState = {
    center: [53.902284, 27.561831],
    zoom: 9,
    placeMarks:[{x: 53.902284, y:27.561831},{x: 57.902284, y:27.561831}]
};

export const mapReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_ZOOM':
            return {...state, zoom: (action.payload === 9 ? 12 : 9)}
        case 'SET_POSITION':
            return {...state, center: action.payload}
        default:
            return state;
    }
};