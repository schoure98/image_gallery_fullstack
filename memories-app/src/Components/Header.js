import React from "react";
import background from "../background.jpeg";
import logo from "../logo.png";

function Header() {
  return (
    <div>
      <header>
        <img src={background} alt="logo" width="14%" />
      </header>
    </div>
  );
}

export default Header;
