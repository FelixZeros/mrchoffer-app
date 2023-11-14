export default (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_USER_LOCAL":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};
