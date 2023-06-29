import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const { AuthSuccessLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  React.useEffect(() => {
    if (!isAuthenticated && !AuthSuccessLoading) navigate("/login");
  }, [isAuthenticated, AuthSuccessLoading, navigate]);

  if (AuthSuccessLoading) return null;
  if (isAuthenticated) return children;
  return null;
}

export default RequireAuth;
