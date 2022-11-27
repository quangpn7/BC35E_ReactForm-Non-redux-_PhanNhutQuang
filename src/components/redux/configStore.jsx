import { configureStore } from "@reduxjs/toolkit";
import { dataSv } from "./reducer/dataReducer";
import { inputFieldReducer } from "./reducer/formInputReducer";
import { cloneData } from "./reducer/tableReducer";
// import { inputValidationReducer } from "./reducer/validationReducer";

export const store = configureStore({
  //State zone
  reducer: {
    //Data sv
    dataSv: dataSv,
    // Input Field -> Quick forming and getting data at input fields
    inputFieldReducer: inputFieldReducer,
    cloneDataReducer: cloneData,
    // Validation
    // inputValidationReducer: inputValidationReducer,
    //Update -> config display button
    isUpdate: (state = false, action) => {
      switch (action.type) {
        case "EDIT_STUDENT":
          return true;
        case "UPDATE_STUDENT": {
          return false;
        }
        case "DELETE_STUDENT": {
          return false;
        }

        default:
          return state;
      }
    },
    //Valid -> add, update
    isValid: (state = false, action) => {
      switch (action.type) {
        case "GET_INPUT":
          return false;
        case "UPDATE_STUDENT": {
          return false;
        }
        case "ADD_NEW_STUDENT": {
          return false;
        }

        default:
          return false;
      }
    },
    isSearching: (state = false, action) => {
      switch (action.type) {
        case "SEARCHING":
          return true;
        default:
          return false;
      }
    },
  },
});
