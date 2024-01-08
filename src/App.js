import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import React from "react";
import {HomeLayout} from "./HomeLayout";
import {Management} from "./Management";
import {ChakraProvider} from "@chakra-ui/react";

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path={"/"} element={<HomeLayout />} >
      <Route path={"management"} element={<Management />} />
    </Route>
    ),
);
function App() {
  return(
    <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
