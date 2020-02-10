// Authenticated user reducer.
export default (state = [], {type, payload}) => {
  switch (type) {
    case 'CHANGE_MENU':
      return payload;
    default:
      return state;
  }
};
