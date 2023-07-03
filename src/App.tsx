import axios from "axios";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post(
      import.meta.env.VITE_LOGIN_ENDPOINT,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const { token } = response.data;

    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login,
          logout,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
