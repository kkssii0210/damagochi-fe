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
      <Spacer h={100} />
      <Box
        w="100%"
        h="150px"
        mt={5}
        textAlign="center"
        backgroundColor="grey"
        color="white"
      >
        <Box mt={15}>diq
        </Box>
      </Box>
    </>
  );
}
