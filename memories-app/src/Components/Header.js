import React from "react";
import background from "../background.jpeg";
import logo from "../logo.png";

function Header() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" width="20%" />
      </header>
    </div>
  );
}

export default Header;
