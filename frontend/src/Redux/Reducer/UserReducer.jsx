const initialState = {
    user: {}
}

const Reducer = (state = initialState, { type, payload }) => {
    if (type === 'AUTH_SUCCESS') {
        return {
            ...state,
            user: payload ? payload : {}
        }
    }
    return state
}

export default Reducer