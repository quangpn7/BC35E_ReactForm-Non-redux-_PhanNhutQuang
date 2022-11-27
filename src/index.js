import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./components/redux/configStore";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import QLSV from "./../src/components/BaiTapQLSV/QLSV";
import QLSVREDUX from "./components/BaiTapQlsvRedux/QLSVREDUX";
import HomeLayout from "./components/HomeLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Redux setup
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<HomeLayout />}>
              <Route index path="non-redux" element={<QLSV />} />
              <Route path="redux" element={<QLSVREDUX />} />
              <Route path="*" element={<Navigate to="/non-redux" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
