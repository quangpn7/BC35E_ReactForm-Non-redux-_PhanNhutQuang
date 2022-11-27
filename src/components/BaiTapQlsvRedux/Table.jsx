import React, { Component } from "react";
import { connect } from "react-redux";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
    };
  }
  // Handle edit student
  handleEditBtn = (student) => {
    this.props.editStudent(student);
  };
  //Handle delete student
  handleDeleteBtn = (id) => {
    this.props.deleteStudent(id);
  };

  render() {
    //get 'dataSv' of global state as props
    const { dataSv, cloneDataReducer, isSearching } = this.props;
    let dataRender = isSearching ? cloneDataReducer : dataSv;

    if (dataRender.length === 0) {
      return (
        <div className="mt-5 text-center fst-italic">
          <h3 className="text-danger">
            *CHƯA CÓ DỮ LIỆU HOẶC TÌM KIẾM KHÔNG TRÙNG KHỚP
          </h3>
        </div>
      );
    }
    let contentTable = dataRender.map((sv, index) => {
      return (
        <tr key={index} className="text-start">
          <td className="ps-4">{sv.id}</td>
          <td>{sv.fullName}</td>
          <td>{sv.phone}</td>
          <td>{sv.email}</td>
          <td className="d-flex">
            <button
              className=" btn-primary"
              onClick={() => {
                this.handleEditBtn(sv);
              }}
            >
              <i className="fas fa-edit"></i>
            </button>

            <button
              className="btn-danger ms-2"
              onClick={() => {
                this.handleDeleteBtn(sv.id);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="mt-3">
        <div className="table-responsive">
          <table className="table table-hover table-striped border">
            <thead>
              <tr className="bg-dark text-white">
                <th>Mã số SV</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th />
              </tr>
            </thead>
            <tbody id="bodyTable">{contentTable}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSv: state.dataSv,
    cloneDataReducer: state.cloneDataReducer,
    isSearching: state.isSearching,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editStudent: (student) => {
      const action = {
        type: "EDIT_STUDENT",
        student,
      };
      dispatch(action);
    },
    deleteStudent: (id) => {
      const action = {
        type: "DELETE_STUDENT",
        id,
      };
      dispatch(action);
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
