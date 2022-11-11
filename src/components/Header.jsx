import React from "react";
import "../styles/css/components/header.css";
import useTheme from "../utils/Theme";
import NavbarLink from "./NavbarLink";

/**
 * @function Header
 */
const Header = () => {
  const { currentTheme } = useTheme();
  return (
    <header className={`app-header ${currentTheme}`}>
      <div className="app-header-title">
        <h1>Ilyas Boukhechem</h1>
        <span>Software React developer</span>
      </div>
      <nav className="app-header-nav">
        <ul className="app-header-nav-list">
          <NavbarLink name={"Home"} path={"/"} />
          <NavbarLink name={"Projects"} path={"/project"} />
          <NavbarLink name={"About"} path={"/about"} />
          <NavbarLink name={"Contact"} path={"/contact"} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
