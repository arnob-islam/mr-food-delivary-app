const initialState = {
  socket: null,
};

const GlobalReducer = (state = initialState, { type, payload }) => {
  if (type === "INITIALIZE_SOCKET") {
    return {
      ...state,
      socket: payload,
    };
  }
  return state;
};

export default GlobalReducer;
