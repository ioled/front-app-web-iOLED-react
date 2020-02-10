export default (state = [], {type, payload}) => {
  switch (type) {
    case 'LIST_DEVICES':
      return payload;
    case 'UPDATE_DEVICE':
      return state.map((device, index) => {
        if (index !== payload.index) {
          return device;
        }
        return {
          ...device,
          ...payload.device.config,
        };
      });
    case 'GET_STATE':
      return state.map((device, index) => {
        if (index !== payload.index) {
          return device;
        }
        return {
          ...device,
          ...payload.state,
        };
      });
    default:
      return state;
  }
};
