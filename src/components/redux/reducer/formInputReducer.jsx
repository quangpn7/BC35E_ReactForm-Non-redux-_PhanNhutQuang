const stateDefault = { id: "", fullName: "", phone: "", email: "" };

export const inputFieldReducer = (state = stateDefault, action) => {
  let newInputState = { ...state };

  switch (action.type) {
    case "GET_INPUT":
      newInputState[action.inputType] = action.payload;
      return newInputState;
    case "ADD_NEW_STUDENT":
      return stateDefault;
    case "EDIT_STUDENT":
      return action.student;
    case "UPDATE_STUDENT":
      return stateDefault;
    case "DELETE_STUDENT":
      return stateDefault;
    default:
      return state;
  }
};
