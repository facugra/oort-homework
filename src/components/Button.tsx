import styled from "styled-components";

type Props = {
  feel?: "positive" | "negative";
};

const Button = styled.button<Props>`
  height: 40px;
  background-color: ${({ feel }) =>
    feel === "positive"
      ? "#78d18d"
      : feel === "negative"
      ? "#f3969a"
      : "#cccccc"};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  padding: 0 15px;

  &:hover {
    background-color: ${({ feel }) =>
      feel === "positive"
        ? "#63b878"
        : feel === "negative"
        ? "#f1687a"
        : "#b3b3b3"};
  }
`;

export default Button;
