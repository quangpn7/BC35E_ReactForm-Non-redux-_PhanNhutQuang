import React, { Component } from "react";
import { connect } from "react-redux";

class TableFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchType: "id",
      cloneData: [],
    };
  }

  handleChangeSearchType = (e) => {
    this.setState({
      searchType: e.target.value,
    });
  };
  handleInputSearch = (e) => {
    const { value } = e.target;
    const { dataSv } = this.props;
    const { searchType } = this.state;

    console.log(value);
    const filteredData = dataSv.filter((sv) => {
      if (sv[searchType].toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    });
    const action = {
      type: "SEARCHING",
      payload: filteredData,
    };
    this.props.dispatch(action);
  };
  resetSearch = () => {};
  render() {
    return (
      <div>
        <div className="d-flex g-4 mt-3">
          <input
            className="form-control w-25"
            id="searchField"
            type="text"
            name="searchBar"
            placeholder="Search..."
            onChange={(e) => {
              this.handleInputSearch(e);
            }}
          />
          <select
            name="searchBy"
            className="mx-1 form-select w-25"
            onChange={(e) => {
              this.handleChangeSearchType(e);
            }}
          >
            <option value="id">Mã SV</option>
            <option value="fullName">Họ tên</option>
            <option value="phone">Số điện thoại</option>
            <option value="email">Email</option>
          </select>
          <button className="btn ">
            <i className="fas fa-sync"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataSv: state.dataSv,
});

export default connect(mapStateToProps)(TableFilter);
