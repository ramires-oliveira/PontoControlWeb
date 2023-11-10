import Logo1 from "../../assets/images/Logo_2.png";
import { Navbar, NavbarMobile } from "./styles";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../auth/authService";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../reactContext/SidebarContext";

export function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { user } = useSidebar();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar>
      <Link to={user?.typeUser === 1 ? "/home" : ""} className="link">
        <img src={Logo1} alt="Logo" id="logo" />
      </Link>
      <FiLogOut className="logout" onClick={handleLogout} />
      {toggleMenu && screenWidth < 600 && (
        <NavbarMobile>
          <RxHamburgerMenu onClick={toggleNav} />
          <NavLink
            to="/profile"
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
          {user?.typeUser === 0 && (
            <NavLink
              to="/newEmployee"
              id="routes"
              onClick={() => toggleMenu && toggleNav}
            >
              <span>Novo Funcionário</span>
            </NavLink>
          )}
          {user?.typeUser === 1 && (
            <>
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
            </>
          )}
          <div id="routes" onClick={handleLogout}>
            <span>Sair</span>
          </div>
        </NavbarMobile>
      )}
      <RxHamburgerMenu className="menuMobile" onClick={toggleNav} />
    </Navbar>
  );
}

export default NavBar;
