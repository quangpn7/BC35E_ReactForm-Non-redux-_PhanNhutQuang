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
// const stateDefault = [...fetchData()];
//clone use for filter search that not effect to main data
// Export dataSv as state in global store
export const dataSv = (state = [...fetchData()], action) => {
  switch (action.type) {
    case "ADD_NEW_STUDENT": {
      const cloneData = [...fetchData()];

      saveToLocalStorage([...cloneData, action.student]);
      return [...cloneData, action.student];
    }
    case "UPDATE_STUDENT": {
      let index = [...state].findIndex((sv) => sv.id === action.student.id);
      console.log(index);
      let newData = [...state];
      newData[index] = action.student;
      saveToLocalStorage(newData);
      return newData;
    }
    case "DELETE_STUDENT": {
      let index = [...state].findIndex((sv) => sv.id === action.id);
      const cloneData = [...state];

      cloneData.splice(index, 1);
      saveToLocalStorage(cloneData);
      return cloneData;
    }

    default:
      return [...state];
  }
};
