// Authenticated user reducer.
export default (state = [], {type, payload}) => {
  switch (type) {
    case 'CHANGE_MENU':
      return payload;
    case 'CHANGE_ID':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
