import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import OrganizationPage from "./pages/OrganizationPage";
import Organization from "./pages/Organization";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/register" element={<Register />} />
        <Route path="/OrganizationPage" element={<OrganizationPage />} />
        <Route path="*" element={<h1>Not Found</h1>  } />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
