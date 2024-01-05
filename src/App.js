import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { RouterProvider } from "react-router";
import { WelcomePage } from "./WelcomePage";
import { MemberLogin } from "./MemberLogin";

// const routes = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<WelcomePage />}>
//       <Route path="login" element={<MemberLogin />} />
//     </Route>,
//   ),
// );
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="login" element={<MemberLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
