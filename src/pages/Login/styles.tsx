import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 725px) {
    flex-direction: column;
    height: auto;
  }
`;

export const ContentImg = styled.div`
  background: linear-gradient(to top, #ffffff, #29abe3);
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  #logoMobile {
    display: none;
  }

  @media (max-width: 725px) {
    width: 100%;
    background: #fff;

    #logo {
      display: none;
    }

    #logoMobile {
      display: block;
      width: 45%;
    }
  }
`;

export const ContentForm = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;

  @media (max-width: 725px) {
    width: 100%;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem;
  gap: 3rem;
  width: 100%;
  max-width: 800px;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  div span:first-of-type {
    margin-top: 1rem;
  }

  @media (max-width: 1200px) {
    padding: 4rem;
  }

  @media (max-width: 900px) {
    padding: 2rem;
  }

  @media (max-width: 725px) {
    padding: 0 4rem 4rem 4rem;

    h1 {
      display: none;
    }
  }

  @media (max-width: 400px) {
    padding: 0 2rem 2rem 2rem;
  }
`;
