import React from "react";

const NavBar = ({ count }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container" style={{ "justifyContent": "left" }}>
        Navbar <span className="badge bg-secondary ml-1">{count}</span>
      </div>
    </nav>
  );
};

export default NavBar;
