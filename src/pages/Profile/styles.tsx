import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ContentHeader = styled.div`
  text-align: left;
`;

export const ContentForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  padding: 2rem 0;

  @media (max-width: 650px) {
    grid-gap: 1.5rem;
    padding: 1rem 0;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
    padding: 0;
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: center;
`;
