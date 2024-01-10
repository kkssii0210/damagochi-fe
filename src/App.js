import React from "react";

import {
    BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
    Routes,
  RouterProvider,
} from "react-router-dom";
import { WelcomePage } from "./WelcomePage";
import { MemberLogin } from "./MemberLogin";
import { MemberSignUp } from "./MemberSignUp";
import { HomeLayout } from "./layout/HomeLayout";
import { RouterProvider } from "react-router";
import OrderWrite from "./page/payment/OrderWrite";
import Payment from "./page/payment/Payment";
import { Success } from "./page/payment/Success";
import { Fail } from "./page/payment/Fail";
import {Management} from "./Management";
import ItemRegister from "./page/store/Item/ItemRegister";
import ItemList from "./page/store/Item/ItemList";
import HomeLayout from "./page/component/HomeLayout";
import ItemView from "./page/store/Item/ItemView";
import ItemEdit from "./page/store/Item/ItemEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="login" element={<MemberLogin />} />
        <Route path="MemberSignUp" element={<MemberSignUp />} />
        <Route path="Order" element={<OrderWrite />} />
        <Route path="payment" element={<Payment />} />
        <Route path="success" element={<Success />} />
        <Route path="fail" element={<Fail />} />
        <Route path={"management"} element={<Management />} />
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
