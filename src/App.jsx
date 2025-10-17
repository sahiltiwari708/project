import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import {Route,Routes, useLocation} from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";

import { useAuth } from "./context/AuthProvider";


function App() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const hideNavbarFooter = ["/login", "/register"].includes(location.pathname);
  
  return (
    <div >
      {!hideNavbarFooter && <Navbar/>}
      {/* Defining routes*/}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/blogs" element={<Blogs/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/dashboard" element={user ? <Dashboard/> : <Login/>}/>
        <Route exact path="/creators" element={<Creators/>}/>
      </Routes>
      
      
      {!hideNavbarFooter && <Footer/>}
    </div>
  );
}

export default App;