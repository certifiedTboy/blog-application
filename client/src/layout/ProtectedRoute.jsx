import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ currentUser, children }) => {
  return currentUser ? (
    children
  ) : (
    <Navigate to="/get-started/sign-in" replace />
  );
};

export default ProtectedRoutes;
