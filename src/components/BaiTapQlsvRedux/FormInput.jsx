import React, { Component } from "react";
import Table from "./Table";
import TableFilter from "./TableFilter";

import { connect } from "react-redux";
class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      messErrorSet: {
        id: "",
        fullName: "",
        phone: "",
        email: "",
      },
    };
  }
  //Method set valid

  isValid = () => {
    let inputField = this.props.inputFieldReducer;
    let clonedState = { ...this.state.messErrorSet };
    for (let key in clonedState) {
      if (clonedState[key] !== "" || inputField[key] === "") {
        return false;
      }
    }
    return true;
  };
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.setState({
        valid: this.isValid(),
      });
    }
    if (prevProps.inputFieldReducer !== this.props.inputFieldReducer) {
      this.setState({
        valid: this.isValid(),
      });
    }
  }

  //Method get data
  getInput = (e) => {
    let { value, id } = e.target;
    //dispatch to REDUX
    const action = {
      type: "GET_INPUT",
      inputType: id,
      // valid: this.isValid(),
      payload: value,
    };
    this.props.dispatch(action);
    //Catch Error:
    let newError = { ...this.state.messErrorSet };
    let messError = "";
    if (value.trim() === "") {
      messError = "*Không để trống";
    } else {
      if (id === "id") {
        const existedId = this.props.dataSv.map((sv) => sv.id);
        if (existedId.includes(value)) {
          messError = "*ID đã tồn tại";
        }
      } else if (id === "phone") {
        let regexNumber =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!regexNumber.test(value)) {
          messError = "*Số điện thoại không hợp lệ";
        }
      } else if (id === "fullName") {
        let regexName = new RegExp(
          /^[A-Za-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
        );
        if (!regexName.test(value)) {
          messError =
            "*Tên phải viết in chữ cái đầu, không có số, không có ký tự đặc biệt";
        }
      } else if (id === "email") {
        let regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!regexEmail.test(value)) {
          messError = "*Email không hợp lệ";
        }
      }
      // } else if (type === "id") {
      //   for (let existedId of this.props.existedId) {
      //     if (value === existedId) {
      //       messError = pureInputName + " đã tồn tại";
      //     }
      //   }
      //   let regexId = new RegExp(/^[a-zA-Z0-9_.-]*$/);
      //   if (!regexId.test(value)) {
      //     messError = pureInputName + " không có ký tự đặc biệt";
      //   }
      // }
    }
    newError[id] = messError;
    this.setState({
      messErrorSet: newError,
    });
  };
  //Method push new student
  addNewStudent = () => {
    if (this.state.valid) {
      this.props.addStudent(this.props.inputFieldReducer);
    }
  };
  //Method update student
  editStudent = (student) => {
    if (this.state.valid) {
      this.props.editStudent(student);
    }
  };
  //Method delete student
  deleteStudent = (id) => {
    this.props.deleteStudent(id);
  };

  render() {
    let { inputFieldReducer, isUpdate } = this.props;
    let { fullName, id, phone, email } = this.state.messErrorSet;

    return (
      <div>
        <div className="row gy-3">
          <div className="col-6">
            <label htmlFor="msSV">Mã SV</label>
            <input
              data-type="id"
              id="id"
              className="form-control"
              value={inputFieldReducer.id}
              disabled={isUpdate}
              onChange={(e) => {
                this.getInput(e);
              }}
            />
            {id !== "" && <div className="text-danger mt-2">{id}</div>}
          </div>
          <div className="col-6">
            <label htmlFor="hoTen">Họ tên</label>
            <input
              id="fullName"
              data-type="name"
              className="form-control"
              value={inputFieldReducer.fullName}
              onChange={(e) => {
                this.getInput(e);
              }}
            />
            {fullName !== "" && (
              <div className="text-danger mt-2">{fullName}</div>
            )}
          </div>

          <div className="col-6">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              data-type="number"
              className="form-control"
              value={inputFieldReducer.phone}
              onChange={(e) => {
                this.getInput(e);
              }}
            />
            {phone !== "" && <div className="text-danger mt-2">{phone}</div>}
          </div>

          <div className="col-6">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              data-type="email"
              className="form-control"
              value={inputFieldReducer.email}
              onChange={(e) => {
                this.getInput(e);
              }}
            />
            {email !== "" && <div className="text-danger mt-2">{email}</div>}
          </div>
        </div>
        {isUpdate ? (
          <div className="mt-3">
            <button
              className="btn btn-warning "
              disabled={!this.state.valid}
              onClick={() => {
                this.editStudent(inputFieldReducer);
              }}
            >
              Update
            </button>
            <button
              className="btn btn-danger ms-3"
              onClick={() => {
                this.deleteStudent(inputFieldReducer.id);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            className="btn btn-success mt-3"
            disabled={!this.state.valid}
            onClick={() => {
              this.addNewStudent();
            }}
          >
            Thêm sinh viên
          </button>
        )}
        <TableFilter />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSv: state.dataSv,
    inputFieldReducer: state.inputFieldReducer,
    inputValidationReducer: state.inputValidationReducer,
    isUpdate: state.isUpdate,
    isValid: state.isValid,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      const action = {
        type: "ADD_NEW_STUDENT",
        student,
      };
      dispatch(action);
    },
    editStudent: (student) => {
      const action = {
        type: "UPDATE_STUDENT",
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

const ComponentRedux = connect(mapStateToProps, mapDispatchToProps)(FormInput);
export default ComponentRedux;
