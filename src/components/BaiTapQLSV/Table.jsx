import React, { Component } from "react";

export default class Table extends Component {
  render() {
    const { dataSv, deleteStudent, handleEditData, searchMode, filteredData } =
      this.props;
    let data = searchMode === false ? dataSv : filteredData;

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
            <tbody>
              {data.map((sv, index) => {
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
                          handleEditData(sv);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      <button
                        className="btn-danger ms-2"
                        onClick={() => {
                          deleteStudent(sv.id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
