import styled from "styled-components";

const Badge = styled.span<{ state?: string }>`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${({ state }) =>
    state === "running"
      ? "#78d18d"
      : state === "pending" || state === "shutting-down" || state === "stopping"
      ? "#f7d47c"
      : "#f3969a"};
  color: #ffffff;
`;

export default Badge;
