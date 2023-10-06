import styled from "styled-components";

export const Navbar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to top, #ffffff, #29abe3);
  padding: 0.5em;
  align-items: center;
  height: 3.5rem;

  .link {
    display: flex;

    img {
      height: 3.5rem;
    }
  }

  svg {
    cursor: pointer;
    font-size: 1.5rem;
  }

  .menuMobile {
    display: none;
  }

  @media (max-width: 600px) {
    .logout {
      display: none;
    }

    .menuMobile {
      display: block;
    }
  }
`;

export const NavbarMobile = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 1rem;
  background-color: #29abe3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(to top, #ffffff, #29abe3);

  svg {
    color: #3c3c3b;
    align-self: end;
  }

  a {
    display: flex;
    justify-content: center;
  }

  div,
  span {
    color: #3c3c3b;
    font-weight: 700;
  }
`;
