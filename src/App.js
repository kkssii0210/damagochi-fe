import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import React from "react";
import {HomeLayout} from "./HomeLayout";
import {Management} from "./Management";

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path={"/"} element={<HomeLayout />} >
      <Route path={"management"} element={<Management />} />
    </Route>
    ),
);
function App() {
  return(
    <div>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
