import styled from "styled-components";

type Props = {
  feel?: "positive" | "negative" | "neutral";
};

const Button = styled.button<Props>`
  height: 40px;
  background-color: ${({ feel }) =>
    feel === "positive"
      ? "#78d18d"
      : feel === "negative"
      ? "#f3969a"
      : feel === "neutral"
      ? "#FFA67A"
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
        : feel === "neutral"
        ? "#FF8C00"
        : "#b3b3b3"};
  }
`;

export default Button;
