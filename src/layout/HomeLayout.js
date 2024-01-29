import { Box, Spacer } from "@chakra-ui/react";
import NavBar from "../page/component/NavBar";
import { Outlet } from "react-router";
import home from "../homeLayout.module.css";

export function HomeLayout() {
  return (
      <div
        className={home.homelayout}>
        <NavBar />
        <Outlet />
      </div>

  );
}
