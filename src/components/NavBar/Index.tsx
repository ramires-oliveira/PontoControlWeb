import Logo1 from "../../assets/images/Logo_2.png";
import Logo3 from "../../assets/images/Logo_3.png";
import { Navbar, NavbarMobile } from "./styles";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <Navbar>
      <Link to="/home" className="link">
        <img src={Logo1} alt="Logo" id="logo" />
      </Link>
      <FiLogOut className="logout" />
      {toggleMenu && screenWidth < 600 && (
        <NavbarMobile>
          <RxHamburgerMenu onClick={toggleNav} />
          <NavLink
            to="/perfil"
            id="routes"
            onClick={() => toggleMenu && toggleNav}
          >
            <span>Perfil</span>
          </NavLink>
          <NavLink
            to="/home"
            id="routes"
            onClick={() => toggleMenu && toggleNav}
          >
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/newEmployee"
            id="routes"
            onClick={() => toggleMenu && toggleNav}
          >
            <span>Novo Funcionário</span>
          </NavLink>
          <NavLink
            to="/markTime"
            id="routes"
            onClick={() => toggleMenu && toggleNav}
          >
            <span>Marcar Ponto</span>
          </NavLink>
          <NavLink
            to="/dotMirror"
            id="routes"
            onClick={() => toggleMenu && toggleNav}
          >
            <span>Espelho de Ponto</span>
          </NavLink>
        </NavbarMobile>
      )}
      <RxHamburgerMenu className="menuMobile" onClick={toggleNav} />
    </Navbar>
  );
}

export default NavBar;
