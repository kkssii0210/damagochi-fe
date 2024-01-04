import React from 'react';
import { Box } from "@chakra-ui/react";
import ItemNavBar from "../store/Item/ItemNavBar";



function HomeLayout() {
  return (
    <>
      <Box>
        <ItemNavBar />
        {/*<Outlet />*/}
      </Box>
    </>
  );
}

export default HomeLayout;
