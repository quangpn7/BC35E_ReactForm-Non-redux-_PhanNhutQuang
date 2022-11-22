import React, { Component } from "react";

export default class TableFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      searchType: "id",
    };
  }
  handleInput = (key) => {
    this.setState({
      searchKey: key,
    });
  };
  handleType = (type) => {
    this.setState({
      searchType: type,
    });
  };
  render() {
    const { handleSearch, resetSearch } = this.props;
    return (
      <div className="d-flex g-4 mt-3">
        <input
          className="form-control w-25"
          id="searchField"
          type="text"
          name="searchBar"
          placeholder="Search..."
          defaultValue={this.state.searchKey}
          onKeyUp={(e) => {
            this.handleInput(e.target.value);
            handleSearch(e.target.value, this.state.searchType);
          }}
        />
        <select
          name="searchBy"
          className="mx-1 form-select w-25"
          onChange={(e) => {
            this.handleType(e.target.value);
          }}
        >
          <option value="id">Mã SV</option>
          <option value="fullName">Họ tên</option>
          <option value="phone">Số điện thoại</option>
          <option value="email">Email</option>
        </select>
        <button
          className="btn "
          onClick={() => {
            resetSearch();
          }}
        >
          <i className="fas fa-sync"></i>
        </button>
      </div>
    );
  }
}
