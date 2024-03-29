import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const ContentHeader = styled.div`
  text-align: left;
`;

export const ContentFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: flex;
    gap: 1rem;

    button svg {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 815px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ContentNotMarkTime = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 20%;
  }
`;

export const FilterData = styled.div`
  .buttonFilter {
    background-color: #29abe3;
    border: none;
    min-width: 60px;
    min-height: 55px;
    border-radius: 5px;
    margin-left: 2px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    svg {
      color: white;
      font-size: 26px;
    }
  }

  .buttonFilter:hover {
    background-color: #42c0f0;
  }

  @media (max-width: 815px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 350px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FilterActions = styled.div`
  @media (max-width: 815px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 350px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentTable = styled.div`
  display: flex;
  margin-top: 1rem;

  .content {
    width: 100%;
    display: table;
    table-layout: fixed;
  }

  div {
    display: flex;
    gap: 1rem;
  }

  .MuiTableCell-head {
    font-size: 1rem;
    font-weight: 600;
  }

  .MuiTableCell-root {
    border-left: 1px solid rgba(224, 224, 224, 1);
    font-family: "Poppins", sans-serif;
  }

  .holiday-cell {
    background-color: #bdff00;
  }

  .dayOff-cell {
    background-color: #29abe3;
  }
`;
