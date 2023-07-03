import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { Instance } from "../../types/Instance";
import FilterBar from "./components/FilterBar";
import InstanceCard from "./components/InstanceCard";
import Pagination from "./components/Pagination";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 0 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Dashboard = () => {
  const { logout } = useAuth();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [sortBy, setSortBy] = useState("Name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshData({ sortBy, sortDirection, page, pageSize });
  }, [sortBy, sortDirection, page, pageSize]);

  const handleSortBy = (property: string) => {
    if (property === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(property);
      setSortDirection("asc");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const refreshData = async (filters: {
    sortBy: string;
    sortDirection: string;
    page: number;
    pageSize: number;
  }) => {
    try {
      setLoading(true);
      const result = await axios.post<{ list: Instance[]; count: number }>(
        import.meta.env.VITE_INSTANCES_ENDPOINT,
        filters,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      setInstances(result.data.list);
      setTotalItems(result.data.count);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>Dashboard</Title>
        <Button feel="negative" onClick={handleLogout}>
          Logout
        </Button>
      </HeaderContainer>
      <DashboardContainer>
        <FilterBar
          instances={instances}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortBy={handleSortBy}
        />
        {loading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <CardsContainer>
            {instances.map((instance) => (
              <InstanceCard key={instance.InstanceId} instance={instance} />
            ))}
          </CardsContainer>
        )}
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
