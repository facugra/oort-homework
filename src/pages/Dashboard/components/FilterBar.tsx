import styled from "styled-components";
import Button from "../../../components/Button";
import { Instance } from "../../../types/Instance";
import getPrettyPropName from "../../../utils/getPrettyPropNames";

const FilterBarContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 5px;
`;

const FilterButton = styled(Button)<{
  feel: "positive" | "negative" | "neutral" | undefined;
  sortDirection: "asc" | "desc";
}>`
  position: relative;
  padding-right: ${({ feel }) => (feel ? "30px" : "15px")};

  &:after {
    content: "";
    display: ${({ feel }) => (feel ? "block" : "none")};
    position: absolute;
    top: ${({ sortDirection }) =>
      sortDirection === "asc" ? "calc(50% - 3px)" : "calc(50% + 3px);"};
    right: 8px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px;
    border-color: ${({ sortDirection }) =>
      sortDirection === "asc"
        ? "transparent transparent #FFF transparent"
        : "#FFF transparent transparent transparent"};
  }
`;

interface Props {
  instances: Instance[];
  sortBy: string;
  sortDirection: "asc" | "desc";
  onSortBy: (property: string) => void;
}

const FilterBar = ({ instances, sortBy, sortDirection, onSortBy }: Props) => {
  return (
    <FilterBarContainer>
      <span>Sort By:</span>
      {instances[0] &&
        Object.keys(instances[0]).map((key) => (
          <FilterButton
            key={key}
            onClick={() => onSortBy(key)}
            feel={sortBy === key ? "neutral" : undefined}
            sortDirection={sortDirection}
          >
            {getPrettyPropName(key)}
          </FilterButton>
        ))}
    </FilterBarContainer>
  );
};

export default FilterBar;
