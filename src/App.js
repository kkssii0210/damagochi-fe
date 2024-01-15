import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { WelcomePage } from "./WelcomePage";
import { MemberLogin } from "./MemberLogin";
import { MemberSignUp } from "./MemberSignUp";
import { HomeLayout } from "./layout/HomeLayout";
import OrderWrite from "./page/payment/OrderWrite";
import Payment from "./page/payment/Payment";
import { Success } from "./page/payment/Success";
import { Fail } from "./page/payment/Fail";
import ItemRegister from "./page/store/Item/ItemRegister";
import ItemList from "./page/store/Item/ItemList";
import ItemView from "./page/store/Item/ItemView";
import ItemEdit from "./page/store/Item/ItemEdit";
import Main from "./page/component/Main";
import MongStstusInfo from "./page/mongInfo/MongStatusInfo";
import MongBattleInfo from "./page/mongInfo/MongBattleInfo";
import MongBasicInfo from "./page/mongInfo/MongBasicInfo";
import MongTutorial from "./page/mongInfo/MongTutorial";
import WebSocketComponent from "./WebSocketComponent";
import KakaoRedirectPage from "./KakaoRedirectPage";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      {/*<Route index element={<Main />} />*/}
      <Route path="/loginprocess/KAKAO" element={<KakaoRedirectPage />} />
      <Route path="store/item/view" element={<ItemView />} />
      <Route path="store/item/register" element={<ItemRegister />} />
      <Route path="store/item/list" element={<ItemList />} />
      <Route index element={<WelcomePage />} />
      <Route path="login" element={<MemberLogin />} />
      <Route path="MemberSignUp" element={<MemberSignUp />} />
      <Route path="Order" element={<OrderWrite />} />
      <Route path="payment" element={<Payment />} />
      <Route path="success" element={<Success />} />
      <Route path="fail" element={<Fail />} />
      <Route path="MongStatusInfo" element={<MongStstusInfo/>} />
      <Route path="MongBattleInfo" element={<MongBattleInfo/>} />
      <Route path="MongBasicInfo" element={<MongBasicInfo/>} />
      <Route path="MongTutorial" element={<MongTutorial/>} />
      <Route path={"management"} element={<WebSocketComponent />} />
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
