import React from 'react';
import { Box } from "@chakra-ui/react";
import ItemNavBar from "../store/Item/ItemNavBar";
import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";



function HomeLayout() {
  return (
    <>
      <Box>
        <NavBar />
        <Outlet />
      </Box>
    </>
  );
}

export default HomeLayout;
