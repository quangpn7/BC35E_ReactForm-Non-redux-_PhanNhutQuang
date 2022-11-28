//Fetch data from local storage
let fetchData = () => {
  if (localStorage.getItem("dataSv")) {
    let localData = JSON.parse(localStorage.getItem("dataSv"));
    return localData;
  }
  return [];
};
//Save data down to local storage
let saveToLocalStorage = (newData) => {
  localStorage.setItem("dataSv", JSON.stringify(newData));
};
//Asign data from local to Redux store
const stateDefault = [...fetchData()];
//clone use for filter search that not effect to main data
// Export dataSv as state in global store
export const dataSv = (state = stateDefault, action) => {
  switch (action.type) {
    case "ADD_NEW_STUDENT": {
      const cloneData = [...stateDefault];

      saveToLocalStorage([...cloneData, action.student]);
      return [...cloneData, action.student];
    }
    case "UPDATE_STUDENT": {
      let index = stateDefault.findIndex((sv) => sv.id === action.student.id);
      console.log(index);
      let newData = [...stateDefault];
      newData[index] = action.student;
      saveToLocalStorage(newData);
      return newData;
    }
    case "DELETE_STUDENT": {
      let index = stateDefault.findIndex((sv) => sv.id === action.id);
      const cloneData = [...stateDefault];

      cloneData.splice(index, 1);
      saveToLocalStorage(cloneData);
      return cloneData;
    }

    default:
      return [...state];
  }
};
