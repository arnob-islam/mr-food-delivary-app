const initialState = {
  admin: {},
  orderUpdate: false,
};

const Reducer = (state = initialState, { type, payload }) => {
  if (type === "ADMIN_AUTH_SUCCESS") {
    return {
      ...state,
      admin: payload ? payload : {},
    };
  }
  if (type === "NEW_ORDER_STATUS_IS_UPDATED") {
    return {
      ...state,
      orderUpdate: true,
    };
  }
  if (type === "ORDER_STATUS_UPDATE_FALLBACK") {
    return {
      ...state,
      orderUpdate: false,
    };
  }
  return state;
};

export default Reducer;
