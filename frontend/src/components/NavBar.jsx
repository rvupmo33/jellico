import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbarContainer">
      <br />
      <div className="navbar">
        <h3>Jellico</h3>
        <div className="navLinks">
          <Link to="/">
            <h4>Home</h4>
          </Link>
          <Link to="/create">
            <h4>New Blog</h4>
          </Link>
        </div>
      </div>
      <hr />
      <hr />
    </div>
  );
};

export default NavBar;
