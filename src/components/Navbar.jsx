import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>Surya.dev</div>

      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>

    </nav>
  );
}

export default Navbar;