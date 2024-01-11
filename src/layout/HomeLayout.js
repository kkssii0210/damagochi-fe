import { Box, Spacer, Text } from "@chakra-ui/react";
import NavBar from "../page/component/NavBar";
import { Outlet } from "react-router";

export function HomeLayout() {
  return (
    <>
      <Box>
        <NavBar />
        <Outlet />
      </Box>
    </>
  );
}
