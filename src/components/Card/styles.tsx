import styled from "styled-components";

export const CardContainer = styled.div`
  width: -webkit-fill-available;
  background-color: #f0f0f0;
  padding: 20px;
  transition: width 0.3s;
  display: flex;
  min-height: 100vh;
  height: fit-content;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    padding: 15px;
    margin: 1rem 1rem 1rem 1rem;
  }

  @media (max-width: 300px) {
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
`;
