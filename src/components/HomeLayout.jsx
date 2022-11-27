import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "./HeaderHome";

export default class HomeLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
}
