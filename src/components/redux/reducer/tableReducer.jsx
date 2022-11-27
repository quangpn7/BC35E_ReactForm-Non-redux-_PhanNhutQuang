const stateDefault = [];

export const cloneData = (state = stateDefault, action) => {
  switch (action.type) {
    case "SEARCHING":
      return action.payload;

    default:
      return state;
  }
};
