import styled from "styled-components";

interface CustomButtonProps {
  color?: string;
}

export const ButtonContainer = styled.div<CustomButtonProps>``;

export const Button = styled.button<CustomButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: #29abe3;
  font-size: 16px;
  font-weight: 900;
  border-radius: 5px;
  height: 3.5rem;
  cursor: pointer;
  border: none;
  padding: 1rem 1.5rem;
  font-family: "Poppins", sans-serif;

  &:hover {
    background-color: #42c0f0;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;
