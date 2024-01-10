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
import ItemView from "./page/store/Item/ItemView";
import Main from "./page/component/Main";
import ItemEdit from "./page/store/Item/ItemEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Main />} />
      <Route path="store/item/register" element={<ItemRegister />} />
      <Route path="store/item/list" element={<ItemList />} />
      <Route path="store/item/view/id/:storeId" element={<ItemView />} />
      <Route path="store/item/edit/id/:storeId" element={<ItemEdit />} />
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
