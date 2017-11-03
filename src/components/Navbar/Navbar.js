import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>
  <ul className="nav nav-tabs">
    <li className={window.location.pathname === "/" ? "active" : ""}>
      <Link to="/">Home</Link>
    </li>
    <li className={window.location.pathname === "/createprofile" ? "active" : ""}>
      <Link to="/createprofile">Create Profile</Link>
    </li>
<<<<<<< HEAD:src/components/Navbar/Navbar.js
     <li className={window.location.pathname === "/logout" ? "active" : ""}>
      <Link to="/createprofile">Logout</Link>
=======
    <li className={window.location.pathname === "/logout" ? "active" : ""}>
      <Link to="/logout">Logout</Link>
>>>>>>> 15e9733f18dd2fdd19772f86a9174892b04de3e5:src/components/Navbar/Navbar.js
    </li>
     
   


  </ul>;

export default Navbar;

