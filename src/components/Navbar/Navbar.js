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
    <li className={window.location.pathname === "/logout" ? "active" : ""}>
      <Link to="/logout">Logout</Link>
    </li>
  </ul>;

export default Navbar;
