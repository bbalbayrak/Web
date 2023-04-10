import React from "react";
import Burger from "./Burger";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Nav Bar</div>
      <Burger />
    </nav>
  );
};

export default Navbar;
