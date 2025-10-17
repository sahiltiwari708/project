import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";



function Navbar() {
  const {user,blogs}=useAuth();
  const [show,setShow]=useState(false);

  console.log(blogs);
  return (
    <>
      <nav className="shadow-lg px-4 py-3 relative">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Echo<span className="text-blue-500">Blog</span>
          </div>
          {/*Dekstop Menu */}
          
          <div className="mx-6">
            <ul className=" hidden md:flex items-center space-x-6">
              <li><Link to="/" className="hover:text-blue-500">HOME</Link></li>
              <li><Link to="/blogs" className="hover:text-blue-500">BLOGS</Link></li>
              <li><Link to="/creators" className="hover:text-blue-500">CREATORS</Link></li>
              <li><Link to="/about" className="hover:text-blue-500">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500">CONTACT</Link></li>
            </ul>
            <div className="md:hidden" onClick={()=>setShow(!show)}>{show?<IoCloseSharp size={24}/>:<AiOutlineMenu size={24}/>}</div>


          </div>
          <div className="hidden md:flex space-x-2">
            <Link to="/dashboard" className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md">
              DASHBOARD
            </Link>
            <Link to="/login" className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md">
              LOGIN
            </Link>
          </div>
        </div>
        {/* Mobile Menu */ }
        {show && (
          <div className="bg-white">
            <ul className="flex flex-col h-screen items-center justify-center space-y-3">
              <li><Link to="/" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-500">HOME</Link></li>
              <li><Link to="/blogs"onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-500">BLOGS</Link></li>
              <li><Link to="/creators"onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-500">CREATORS</Link></li>
              <li><Link to="/about"onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-500">ABOUT</Link></li>
              <li><Link to="/contact"onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-500">CONTACT</Link></li>
            </ul>

          </div>
        )}

        </nav>
    </>
  );
   
};

export default Navbar;