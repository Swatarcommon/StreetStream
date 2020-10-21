export const setZoom = (currentZoom) => {
    return {
        type: 'SET_ZOOM',
        payload: currentZoom
    }
}

export const setPosition = () => {
    return {
        type: 'SET_POSITION',
        payload: [53.902284, 27.561831]
    }
}