import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useAuth } from "../../hooks/useAuth";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-bottom: 10px;
`;

const SubmitButton = styled(Button)<{ isLoading: boolean }>`
  margin-top: 10px;
  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.7;
    pointer-events: none;
  `}
`;

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });

      // Reset the form fields
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginContainer>
      <h2>Login</h2>
      <Card>
        <LoginForm onSubmit={handleLogin}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={
              ((e) =>
                setEmail(
                  e.target.value
                )) as React.ChangeEventHandler<HTMLInputElement>
            }
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={
              ((e) =>
                setPassword(
                  e.target.value
                )) as React.ChangeEventHandler<HTMLInputElement>
            }
          />
          <SubmitButton type="submit" isLoading={isLoading} feel="positive">
            {isLoading ? "Logging in..." : "Login"}
          </SubmitButton>
        </LoginForm>
      </Card>
    </LoginContainer>
  );
};

export default Login;
