import styled from "styled-components";

interface SidebarProps {
  isOpen?: boolean;
}

export const SidebarContainer = styled.nav<SidebarProps>`
  position: relative;
  width: ${(props) => (props.isOpen ? "230px" : "48px")};
  margin-bottom: 0.5rem;
  min-height: 100vh;
  padding: 10px 14px;
  background: #fff;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: width 0.5s ease-in-out, height 0.3s ease-in-out;

  @media (max-width: 650px) {
    display: none;
  }
`;

export const ContentHeader = styled.div<SidebarProps>`
  a {
    color: #3c3c3b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;

    .initial {
      height: fit-content;
      background-color: #29abe3;
      color: #fff;
      border-radius: 10px;
      padding: 0.5rem;
      display: flex;

      span {
        font-size: 22px;
        font-weight: 500;
      }
    }

    .nameProfession {
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;

      .name {
        font-size: 14px;
        font-weight: 500;
      }

      .profession {
        font-size: 12px;
        font-weight: 100;
      }

      .name,
      .profession {
        opacity: ${(props) => (props.isOpen ? "1" : "0")};
        transition: width 0.5s ease-in-out, opacity 0.5s ease-in-out;
      }
    }
  }
`;

export const Toggle = styled.div<SidebarProps>`
  position: absolute;
  top: 35px;
  right: -13px;
  transform: translateY(-50%) rotate(180deg);
  height: 25px;
  width: 25px;
  background-color: #29abe3;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transform: translateY(-50%)
    rotate(${(props) => (props.isOpen ? "0deg" : "180deg")});
  transition: transform 0.5s ease-in-out;
`;

export const ContentRoutes = styled.div<SidebarProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  a {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    height: 2rem;
    list-style: none;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    gap: 1.1rem;
    cursor: pointer;
    color: #3c3c3b;

    svg {
      font-size: 30px;
      display: block;
    }

    span {
      color: #3c3c3b;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      width: ${(props) => (props.isOpen ? "100%" : "0")};
      opacity: ${(props) => (props.isOpen ? "1" : "0")};
      transition: width 0.5s ease-in-out, opacity 0.5s ease-in-out;
    }
  }

  a:hover {
    background-color: #29abe3;
    opacity: 0.5;
    color: #fff;
    border-radius: 10px;
  }

  .active {
    background-color: #29abe3;
    color: #fff;
    border-radius: 10px;

    a {
      color: #fff;
    }
  }
`;
