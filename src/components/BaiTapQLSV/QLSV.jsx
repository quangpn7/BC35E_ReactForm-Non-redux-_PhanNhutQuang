import React, { Component } from "react";
// import axios from "axios";
import FormInput from "./FormInput";

import Table from "./Table";
import TableFilter from "./TableFilter";

export default class QLSV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filteredData: [],
      searchMode: false,
      searchType: "id",
      update: false,
      editSv: { id: "", fullName: "", phone: "", email: "" },
      valid: false,
    };
  }

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
  saveToLocalStorage = () => {
    localStorage.setItem("dataSv", JSON.stringify(this.state.data));
  };
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
  getValid = (isValid) => {
    this.setState({
      valid: isValid,
    });
  };
  getExistedId = (data) => {
    return data.map((sv) => {
      return sv.id;
    });
  };
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
  resetSearch = () => {
    document.querySelector("#searchField").value = "";
    this.setState({
      filteredData: this.state.data,
      searchMode: false,
      searchType: "id",
    });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.data) !== JSON.stringify(this.state.data)) {
      this.resetForm();
      this.saveToLocalStorage();
      this.fetchData();
    }
  }

  render() {
    this.getExistedId(this.state.data);
    return (
      <div>
        <h3 className="bg-dark text-white py-2 ps-3">Thông tin sinh viên</h3>
        {/* <ModalEdit /> */}
        <div className="container">
          <FormInput
            update={this.state.update}
            existedId={this.getExistedId(this.state.data)}
            getValid={this.getValid}
            handleSubmit={this.handleSubmit}
            handleUpdate={this.handleUpdate}
            editSv={this.state.editSv}
            deleteStudent={this.deleteStudent}
          />
          <TableFilter
            handleSearch={this.handleSearch}
            resetSearch={this.resetSearch}
          />

          <Table
            dataSv={this.state.data}
            searchMode={this.state.searchMode}
            filteredData={this.state.filteredData}
            deleteStudent={this.deleteStudent}
            handleEditData={this.handleEditData}
          />
        </div>
      </div>
    );
  }
}
