import React, { Component } from "react";

export default class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        id: "",
        fullName: "",
        phone: "",
        email: "",
      },
      errors: {
        id: "",
        fullName: "",
        phone: "",
        email: "",
      },
      valid: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.editSv) !== JSON.stringify(this.props.editSv)
    ) {
      let newValues = this.props.editSv;
      console.log(newValues);
      this.setState({
        values: newValues,
      });
    }
    if (prevState.valid !== this.state.valid) {
      this.props.getValid(this.state.valid);
    }
  }
  isValid = () => {
    let { values, errors } = this.state;
    for (let key in errors) {
      if (errors[key] !== "" || values[key] === "") {
        return false;
      }
    }
    return true;
  };

  handleInputChange = (e) => {
    let { value, id } = e.target;
    let pureInputName = e.target.getAttribute("data-purename");
    let type = e.target.getAttribute("data-type");
    //Hanle input value
    let newValues = this.state.values;
    newValues[id] = value;
    //Handle error/valid
    let newErrors = this.state.errors;
    let messError = "";

    if (value.trim() === "") {
      messError = pureInputName + ` Không để trống`;
    } else {
      if (type === "number") {
        let regexNumber = /^\d{4,16}$/;
        if (!regexNumber.test(value)) {
          messError = pureInputName + " không hợp lệ";
        }
      } else if (type === "name") {
        let regexName = new RegExp(
          /^[A-Za-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
        );
        if (!regexName.test(value)) {
          messError =
            pureInputName +
            " phải viết in chữ cái đầu, không có số, không có ký tự đặc biệt";
          console.log(messError);
        }
      } else if (type === "email") {
        let regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!regexEmail.test(value)) {
          messError = pureInputName + " không hợp lệ";
        }
      } else if (type === "id") {
        for (let existedId of this.props.existedId) {
          if (value === existedId) {
            messError = pureInputName + " đã tồn tại";
          }
        }
        let regexId = new RegExp(/^[a-zA-Z0-9_.-]*$/);
        if (!regexId.test(value)) {
          messError = pureInputName + " không có ký tự đặc biệt";
        }
      }
    }
    newErrors[id] = messError;

    this.setState(
      {
        values: newValues,
        errors: newErrors,
      },
      () => {
        let valid = this.isValid();
        this.setState({
          valid: valid,
        });
      }
    );
  };
  render() {
    const { handleSubmit, update, handleUpdate, deleteStudent } = this.props;
    console.log(this.props.existedId);
    return (
      <div>
        <div className="row gy-3">
          <div className="col-6">
            <label htmlFor="msSV">Mã SV</label>
            {update === true ? (
              <input
                data-type="id"
                data-purename="ID"
                id="id"
                onInput={this.handleInputChange}
                disabled
                className="form-control"
              />
            ) : (
              <input
                data-type="id"
                id="id"
                data-purename="ID"
                onInput={this.handleInputChange}
                className="form-control"
              />
            )}
            {this.state.errors.id !== "" && (
              <div className="text-danger mt-2">*{this.state.errors.id}</div>
            )}
          </div>
          <div className="col-6">
            <label htmlFor="hoTen">Họ tên</label>
            <input
              id="fullName"
              data-type="name"
              data-purename="Tên"
              className="form-control"
              onInput={this.handleInputChange}
            />
            {this.state.errors.fullName !== "" && (
              <div className="text-danger mt-2">
                *{this.state.errors.fullName}
              </div>
            )}
          </div>

          <div className="col-6">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              data-type="number"
              data-purename="Số điện thoại"
              className="form-control"
              onInput={this.handleInputChange}
            />
            {this.state.errors.phone !== "" && (
              <div className="text-danger mt-2">*{this.state.errors.phone}</div>
            )}
          </div>

          <div className="col-6">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              data-type="email"
              data-purename="Email"
              className="form-control"
              onInput={this.handleInputChange}
            />
            {this.state.errors.email !== "" && (
              <div className="text-danger mt-2">*{this.state.errors.email}</div>
            )}
          </div>
        </div>
        {update === true ? (
          <div>
            <button
              className="btn btn-warning mt-3 me-3"
              onClick={() => {
                handleUpdate(this.state.values);
              }}
              disabled={!this.state.valid}
            >
              Update
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={() => {
                deleteStudent(this.state.values.id);
              }}
            >
              Xoá sinh viên
            </button>
          </div>
        ) : (
          <button
            className="btn btn-success mt-3"
            onClick={() => {
              handleSubmit(this.state.values);
            }}
            disabled={!this.state.valid}
          >
            Thêm sinh viên
          </button>
        )}
      </div>
    );
  }
}
