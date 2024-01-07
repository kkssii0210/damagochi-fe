import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {WelcomePage} from "./WelcomePage";
import {MemberLogin} from "./MemberLogin";
import {MemberSignUp} from "./MemberSignUp";

// );
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="login" element={<MemberLogin />} />
        <Route path="MemberSignUp" element={<MemberSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
