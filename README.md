# ReactJs Form (Non-Redux And Redux) (Updated)
# Documentation for Redux one is not available at the mean time
### By: quangpn7
#### Date: 22 - Nov - 2022
## Overview: (Non-redux)
- This resository contains a **`ReactJs`** App which is builed for student management.
- There are **5 class-components** used for this app:
    - QLSV.jsx (Main component)
    - FormInput.jsx
    - TableFilter.jsx
    - Table.jsx
- There is an image that maps everything in case you want to have a broad scheme of this form app.
- This app uses data from local storage instead of calling from API *(No dummy API could match the required so far.)*
- This document will somehow describe this as project as follow:
    - I. Component
    - II. Validation
    - III. Test case
    - IV. Conclusion
---
# I. Component
## 1. QLSV.**jsx** (Main component)
- Class componenet
- Main component of the App. Structuring every child component as in this repository.
#### State:
```JSX
data: [] // Use for storing data fetching from local storage (or API).
filteredData: [] // Use for storing filtered data (from this.state.data), the condition is provided by TableFilter.jsx.
searchMode: false // Use for configing whether the app is in search mode or not.
update: false // Use for let the know that it is running update form or insert form.
editSv: { id: "", fullName:"",
        phone: "", email: "",} // In short, this state is used for forming an data from Table.jsx to FormInput.jsx by QLSV as an intermediary.
valid: false // Valid state is used for indicating if the inputed data in FormInput.jsx are valid or not.
```
#### Method:
```JSX
fetchData() // Fetching data from local storage.
saveToLocalStorage() // Save to local storage.
resetForm() // Reset form after add new student.
handleSearch(input,type) //Get search key and search .type, the set state data to expected data from searching
resetSearch() // Reset the search section and set the app back to default (just in case there is some problem).
getExistedId(dataArray) // Use for checking if the inputed Id value has been existed or not in this.state.data (same as local storage).
getValid(boolean) // Set the valid state true/ false from FormInput.jsx.
handleEditData(obj) // DOM the clicked student Object which need to be edited. Then, set the FormInput.jsx into update mode.
deleteStudent(id) // Delete the student needed to be deleted. Delete by Id as param.
handleSubmit(obj) // Submit new student, obj is an student object with id, fullName, phone, email. Only when this.state.valid === true, this method will run.
handleUpdate(obj) // Update the studetn information. Only when this.state.valid === true, this method will run.
componenetDidMount() // Use for first fetching (Do fetchData() at first run)
componenetDidUpdate(prevProps, prevState) // Use for checking if state changed, it will run resetForm(), saveToLocalStorage() and fetchData()
```
- The restrict of this main componenet are:
  - Contain too much method, states (whether refactored or not).
  - Cause difficulties in troubleshooting the componenet.
  - Methods are not structures in good order.
- Recommend: When onpen with editor (IDE), better using `Fold` feature. In VsCode, try to use <kbd>cmd + k</kbd> <kbd>cmd + 2</kbd> (***Fold Level 2***) to have a better view on this file.
---
## 2. FomInput.jsx
- Class componenet
- Component that contains:
  - input:
    - `id` 
    - `fullName` 
    - `phone` 
    - `email` 
  - button: 
    - `submit` 
    - `update` 
    - `delete` 
#### State:
```JSX
values: {
        id: "", fullName: "",
        phone: "", email: "",}, // Use to store a value for further function return data for submit or update.
errors: {
        id: "", fullName: "",
        phone: "", email: "",
      }, // Use to store error that need to be displayed
valid: false, // Use for checking if all the information are valid or not, push back this state value to QLSV.jsx
```
#### Props:
```JSX
update // From QLSV.jsx. Using for indicating update or add new student.
editSv // From QLSV.jsx. Using for putting student data that need to be edit into `values` state
```
#### Method:
```JSX
isValid() // Use for checking valid or not by condition and returning boolean value
handleInputChange(event) // Get value of input and setState to this.state.values[...]
componenetDidUpdate(prevProps, prevState) // To check when props change then the editSv will be changed more precisely. Set the valid back to QLSV.jsx
```
---
## 3. TableFilter.jsx
- Class componenet
- Component that contains:
  - Input:
    - Search input
  - Select:
    - Select type of search
  - Button:
    - Reset search button
#### State:
```JSX
searchKey: "" // Use for storing key search and pushing back to QLSV.jsx
searchType: "id" (default) //Use for storing type of search and pushing back to QLSV.jsx
```
#### Props:
```JSX
handleSearch // From QLSV.jsx. Set app to search mode and search data by key
resetSearch // From QLSV.jsx. Reset the search section in case of problem. This will reset the app to default
```
#### Method:
```JSX
handleInput(key) // Handle the input key and set state that key as searchKey and push back to QLSV.jsx for filtering
handleType(type) // Handle the change of searching type, set state the type as searchType and push back to QLSV.jsx
```  
---
## 3. Table.jsx
- Class componenet
- Component that contains:
  - Table:
    - Render the data that assigned by QLSV.jsx
    - Row:
      - Id: id
      - Họ Tên: fullName
      - Số điện thoại: phone
      - Email: email
      - Button:
        - edit
        - delete
    - Column:
      - Based on the fetched data
#### State:
```JSX
searchKey: "" // Use for storing key search and pushing back to QLSV.jsx
searchType: "id" (default) //Use for storing type of search and pushing back to QLSV.jsx
```
#### Props:
**All from `QLSV.jsx`**
```JSX
dataSv // Data for rendering from map()
searchMode // Key that let the table decide which data to render. (Origin data or filteredData)
filteredData // Filtered data based on TableFilter.jsx and QLSV.jsx return
deleteStudent // Delete certain student based on it's Id, push back to QLSV.jsx to run the method on the origin Data (*also filterdData)
handleEditData // Set the state for QLSV.jsx which student's data need to be eidted and change the app into update mode.
```
#### Method:
```JSX
handleInput(key) // Handle the input key and set state that key as searchKey and push back to QLSV.jsx for filtering
handleType(type) // Handle the change of searching type, set state the type as searchType and push back to QLSV.jsx
```
---
# II. Validation
- There is no specific rule for the validtion case in this App.
- Basic validation rules:
  - All fields **must be filled, no blank**.
  - id: **must be unique**, not matched with existed id.
  - fullName: **only letter character**, no special character or number, Vietnamese characters supported.
  - phone: **only number character**, no decimal number. Length from 10-12 (Supported regional prefix (+)).
  - email: must contains @ and ' . ' for valid email.
- The `Thêm sinh viên` and `Update` are `disabled = true` by **default**. When all the validation pass, they will turn to `disabled = false`.
- To be more secure with acknowledge web user, who know how to inspect and edit the source code in Developer tools. The form will now be submitted or update if the state `valid === false` (***QLSV.jsx***) regardless the `Thêm sinh viên` or `Update` button is active or not. However, when using with API, it need to be more strict from Back-End side, which not allow user to submit. In other words, users cannot submit to root database when `valid: false` (QLSV.jsx).
---
# III. Test case
- For first load on your local devices, there is no local storage as `value: dataSv` and `key: []`.
- The repository contains sample data named `dataStudent.json`.
- `dataStudent.json` contain 20 sample student with valid information.
```json
[{
    "id": "1",
    "fullName": "Claudine Sandels",
    "phone": "1393088538",
    "email": "csandels0@boston.com"
  }, 
  
  
  {
    "id": "2",
    "fullName": "Juditha Syplus",
    "phone": "6122667424",
    "email": "jsyplus1@phoca.cz"
  },
  
  
  {
    "id": "3",
    "fullName": "Gilbert Tison",
    "phone": "3842296858",
    "email": "gtison2@jalbum.net"
  }, ...]

```
- For quickly testing feature like search, edit and delete, add. You can import the data from `dataStudent.json` into your local storage of web browser and reload the App.
#### Testing:
##### - id: (expected unique)
    - 1: true
    - 22: true
    - B35: true
    - 3c5: true
    - @123: false
    - #2312: false
    - "": false
##### - fullName:
    - quang: true
    - Nhựt Quang: true
    - Sean Phan: true
    - Front-End: false
    - quangpn7@github: false
    - "": false
##### - phone:
    - 0123: false
    - +00212: false
    - 0-772-662-922: false
    - 0772662922: true
    - +84772662922: true
    - "": false
##### - email:
    - wang@gmail.com: true
    - wang.cyber@gmail.com: true
    - googlegmail.com: false
    - facebook@gmailcom: false
    - "": false
---
# IV. Conclusion
- The App using less 3rd party library (Redux).
- The `QLSV.jsx` contains too much `method`, `state`.
- The children components of `QLSV.jsx` has to receive too much `props`.
- Not using much LifeCycle features as the excercise required.
- Non-having API for calling. Which make the app more professional in code.
- Still using DOM by querySelector for resting form and search input. Tried using `props`, `state`, `LifeCycle` features to do this but there are unexpected problem. (Try it again in later).
- The app can be more simple if we merge `Table.jsx` and `Table.filter` together. But I prefer keep them distinct for later reviewing and maintainance.
---
# THANKS FOR READING THIS REPOSITORY


