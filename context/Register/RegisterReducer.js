export default (state, action) => {
  switch (action.type) {
    case "SEND_INFO":
      return {
        ...state,
        driver: action.payload,
      };
    case "NEXT_SECTION":
      return {
        ...state,
        driver: action.payload,
      };
    default:
      return state;
  }
};
