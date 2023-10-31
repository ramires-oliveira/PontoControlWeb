import {
  SidebarContainer,
  ContentHeader,
  ContentRoutes,
  Toggle,
} from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useSidebar } from "../../reactContext/SidebarContext";

export function SideBar() {
  const { isOpen, toggleSidebar, user } = useSidebar();

  return (
    <SidebarContainer isOpen={isOpen}>
      <ContentHeader isOpen={isOpen}>
        <Link to="/profile">
          <div className="initial">
            <span>
              {user?.name
                ?.split(" ")
                .map((parte) => parte.charAt(0))
                .slice(0, 2)
                .join("")
                .toLocaleUpperCase()}
            </span>
          </div>

          <div className="nameProfession">
            <span className="name">{user?.name}</span>
            <span className="profession">{user?.position}</span>
          </div>
        </Link>
      </ContentHeader>

      <Toggle isOpen={isOpen} onClick={toggleSidebar}>
        <FaArrowLeft />
      </Toggle>

      <ContentRoutes isOpen={isOpen}>
        <NavLink
          to="/home"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div>
            <AiFillHome />
          </div>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/newEmployee"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div>
            <FaUserPlus />
          </div>
          <span>Novo Funcionário</span>
        </NavLink>
        <NavLink
          to="/markTime"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div>
            <MdMoreTime />
          </div>
          <span>Marcar Ponto</span>
        </NavLink>
        <NavLink
          to="/dotMirror"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <div>
            <BsFillCalendarWeekFill />
          </div>
          <span>Espelho de Ponto</span>
        </NavLink>
      </ContentRoutes>
    </SidebarContainer>
  );
}

export default SideBar;
