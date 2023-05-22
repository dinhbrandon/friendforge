import React from "react";
import logo from "./images/logo.png";
import "./style/header.css"

export default function Header() {
  return (
    <nav>
      <div className="top-nav">
        <div className="inside-center">
          <img src={logo} alt="Logo" className="header-logo inside-center" />
          <a className="header-title text-start inside-center" href="/">
            Friend Forge
          </a>
        </div>
      </div>
      <div className="nav-div"></div>
    </nav>
  );
}
