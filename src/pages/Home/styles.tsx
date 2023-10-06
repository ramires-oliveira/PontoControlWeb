import styled from "styled-components";

interface HomeProps {
  notMarkTime?: boolean;
}

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const Content = styled.div<HomeProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.notMarkTime ? "8rem" : "4rem")};

  @media (max-width: 350px) {
    flex-direction: column;
    gap: ${(props) => (props.notMarkTime ? "6rem" : "2rem")};
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 350px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ContentMarkTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ContentNotMarkTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 15%;
  }
`;
