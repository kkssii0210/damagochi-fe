import React from 'react';
import NavBar from "../page/component/NavBar";
import {Outlet} from "react-router";

function HomeLayout(props) {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  );
}

export default HomeLayout;