import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Organization from "./pages/Organization";
import Header from "./components/Header";



function  App() { 

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App;
