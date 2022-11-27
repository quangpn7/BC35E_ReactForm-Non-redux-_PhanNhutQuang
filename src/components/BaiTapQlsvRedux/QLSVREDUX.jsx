import React, { Component } from "react";
// import axios from "axios";
import FormInput from "./FormInput";

export default class QLSVR extends Component {
  render() {
    return (
      <div>
        <h3 className="bg-dark text-white py-2 ps-3">
          Thông tin sinh viên (With Redux)
        </h3>

        {/* <ModalEdit /> */}
        <div className="container">
          <FormInput></FormInput>
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
