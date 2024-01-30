import React from "react";
import NavBar from "../page/component/NavBar";
import { Outlet } from "react-router";
import home from "./../homeLayout.module.css";
export function HomeLayout(props) {
  return (
    <div className={home.homelayout}>

      <Outlet />
    </div>
  );
}

export default HomeLayout;