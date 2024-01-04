import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ItemRegister from "./page/store/Item/ItemRegister";
import ItemList from "./page/store/Item/ItemList";
import HomeLayout from "./page/component/HomeLayout";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<ItemList />} />
      <Route path="register" element={<ItemRegister />} />
      {/*<Route path="board/:id" element={<BoardView />} />*/}
      {/*id는 useParams() 사용*/}
    </Route>,
  ),
);

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
