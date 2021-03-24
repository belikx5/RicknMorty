import "../../styles/ui/navbar.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className="navbar">
      <img src="../assets/logo.png" alt="logo" />
      <div className="navbar-items">
        <Link
          to="/characters"
          className={pathname === "/characters" ? "selected" : ""}>
          Characters
        </Link>
        <Link
          to="/episodes"
          className={pathname === "/episodes" ? "selected" : ""}>
          Episodes
        </Link>
        <Link
          to="/locations"
          className={pathname === "/locations" ? "selected" : ""}>
          Locations
        </Link>
        <Link
          to="/watchlist"
          className={pathname === "/watchlist" ? "selected" : ""}>
          My watch list
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
