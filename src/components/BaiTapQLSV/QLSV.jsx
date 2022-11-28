import React, { Component } from "react";
// import axios from "axios";
import FormInput from "./FormInput";
//import table componenet
import Table from "./Table";
// import table filter component
import TableFilter from "./TableFilter";

export default class QLSV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], // contains data to render (main datq)
      filteredData: [], // contains filtered data (filter from main data above and filtering condition from TableFilter.jsx)
      searchMode: false, // sets App into search mode or normal mode, default false: normal mode
      searchType: "id", // Search type from TableFilter.jsx to do filter fro filteredData state
      update: false, // sets App into update mode or add mode, different button may appear more fearturely
      editSv: { id: "", fullName: "", phone: "", email: "" }, // state for instant get and push student obj to input field
      valid: false, // sets the valid of the form, default: false which means you cannot push new student or update student
    };
  }
  //Fetch data from local storage. Please insert to your device's browser a new set of local storage with ('key: dataSv' and 'value:[...]'
  //*IMPORTANT: you may want to import the attached JSON file named 'dataStudent.json'. Providing 20 standard sample students' info. In addition, it may help you quickly test search, edit, delete function.
  fetchData = () => {
    if (localStorage.getItem("dataSv")) {
      let localData = JSON.parse(localStorage.getItem("dataSv"));
      try {
        this.setState({
          data: localData,
        });
      } catch (error) {}
    }
  };
  // Save to local storage method. Call this after some specific action later.
  saveToLocalStorage = () => {
    localStorage.setItem("dataSv", JSON.stringify(this.state.data));
  };
  // Reset form method. Traditional method to reset form. At first, I use state for binding to "" but there is some problem with update function and I can figure it out. Somehow, Redux can do this better.
  resetForm = () => {
    document.querySelector("#id").value =
      document.querySelector("#fullName").value =
      document.querySelector("#phone").value =
      document.querySelector("#email").value =
        "";
    this.setState({
      update: false,
    });
  };
  // Handle submit method. This method help you to push the 'filledForm' a.k.a student Object (or editSv state). It will push the data directly to data state.
  handleSubmit = (filledForm) => {
    if (this.state.valid) {
      let newData = [...this.state.data, filledForm];
      alert("Thêm thành công!!!");
      this.resetForm();
      this.setState({
        data: newData,
        editSv: { id: "", fullName: "", phone: "", email: "" },
      });
    }
  };
  // Method to get valid from FormInput.jsx
  getValid = (isValid) => {
    this.setState({
      valid: isValid,
    });
  };
  // Method to get existedId for validation check
  getExistedId = (data) => {
    return data.map((sv) => {
      return sv.id;
    });
  };
  // Method to push new updating student info
  handleUpdate = (filledForm) => {
    if (this.state.valid) {
      let index = this.state.data.findIndex((sv) => sv.id === filledForm.id);
      let newData = [...this.state.data];
      newData[index] = filledForm;

      this.saveToLocalStorage();

      alert("Update thành công!!!");

      this.setState({
        data: newData,
        editSv: { id: "", fullName: "", phone: "", email: "" },
        update: false,
      });
      this.resetForm();
    }
  };
  // Method DOM clicked edit at edit btn in table. Traditional DOM, because of problem I stated at line 39.
  handleEditData = (sv) => {
    document.querySelector("#id").value = sv.id;
    document.querySelector("#fullName").value = sv.fullName;
    document.querySelector("#phone").value = sv.phone;
    document.querySelector("#email").value = sv.email;
    this.setState({
      update: true,
      editSv: sv,
    });
  };
  // Method handle search, needed key search and type of searching to filter new expected data.
  handleSearch = (searchInput, type) => {
    if (searchInput.trim() === "") {
      this.setState({
        searchMode: false,
        filteredData: this.state.data,
      });
    }
    this.setState({
      searchType: type,
    });

    switch (this.state.searchType) {
      case "id":
        const filteredDataById = this.state.data.filter((sv) => {
          if (
            sv.id
              .toString()
              .toLowerCase()
              .includes(searchInput.toString().toLowerCase())
          ) {
            return true;
          }
        });
        this.setState({
          searchMode: true,
          filteredData: filteredDataById,
        });
        break;
      case "phone":
        const filteredDataByPhone = this.state.data.filter((sv) => {
          if (sv.phone.includes(searchInput)) {
            return true;
          }
        });
        this.setState({
          searchMode: true,
          filteredData: filteredDataByPhone,
        });
        break;
      case "email":
        const filteredDataByEmail = this.state.data.filter((sv) => {
          if (sv.email.toLowerCase().includes(searchInput.toLowerCase())) {
            return true;
          }
        });
        this.setState({
          searchMode: true,
          filteredData: filteredDataByEmail,
        });
        break;
      default:
        const filteredDataByName = this.state.data.filter((sv) => {
          if (sv.email.toLowerCase().includes(searchInput.toLowerCase())) {
            return true;
          }
        });
        this.setState({
          searchMode: true,
          filteredData: filteredDataByName,
        });
        break;
    }
  };
  // Method delete student, delete by Id
  deleteStudent = (id) => {
    let index = this.state.data.findIndex((student) => student.id === id);
    let decision = window.confirm(
      `Xác nhận xoá sinh viên ${this.state.data[index].fullName}`
    );
    if (decision) {
      alert(`Xoá thành công sinh viên ${this.state.data[index].fullName}`);
      let newData = [...this.state.data];
      newData.splice(index, 1);
      this.setState({
        data: newData,
      });
    }
  };
  // Reset input field
  resetSearch = () => {
    document.querySelector("#searchField").value = "";
    this.setState({
      filteredData: this.state.data,
      searchMode: false,
      searchType: "id",
    });
  };

  componentDidMount() {
    this.fetchData(); // fetch data from local storage once at mounting
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.data) !== JSON.stringify(this.state.data)) {
      this.resetForm(); // If state change, resetForm, saveLocal as neeeded, re-fetching
      this.saveToLocalStorage();
      this.fetchData();
    }
  }

  render() {
    this.getExistedId(this.state.data);
    return (
      <div>
        <h3 className="bg-dark text-white py-2 ps-3">
          Thông tin sinh viên (Non-redux)
        </h3>

        {/* <ModalEdit /> */}
        <div className="container">
          <FormInput
            update={this.state.update} // let the input know update mode or not
            existedId={this.getExistedId(this.state.data)} // for checking existed id
            getValid={this.getValid} // form valid or not
            handleSubmit={this.handleSubmit}
            handleUpdate={this.handleUpdate}
            editSv={this.state.editSv} // get back inputField value for furthur action
            deleteStudent={this.deleteStudent}
          />
          <TableFilter
            handleSearch={this.handleSearch}
            resetSearch={this.resetSearch}
          />

          <Table
            dataSv={this.state.data} // data for render
            searchMode={this.state.searchMode} // search mode to let the component decide which data to render
            filteredData={this.state.filteredData} // filtered data by search input
            deleteStudent={this.deleteStudent}
            handleEditData={this.handleEditData}
          />
        </div>
        <span className="ms-5 fst-italic text-secondary">
          *Check out{" "}
          <a
            target={"_blank"}
            href="https://github.com/quangpn7/BC35E_ReactForm-Non-redux-_PhanNhutQuang/blob/master/README.md"
          >
            README.md
          </a>{" "}
          in repository for more detail.
        </span>
      </div>
    );
  }
}
