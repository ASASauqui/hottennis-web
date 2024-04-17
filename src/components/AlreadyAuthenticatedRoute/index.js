import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AlreadyAuthenticatedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};
