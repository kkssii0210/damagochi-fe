import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {RouterProvider} from "react-router";
import {WelcomePage} from "./WelcomePage";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WelcomePage/>}>

    </Route>
  )
)
function App() {
  return <RouterProvider router={routes}/>
}

export default App;
