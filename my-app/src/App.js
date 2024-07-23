import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Resister from "./pages/Resister";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Resister></Resister>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
