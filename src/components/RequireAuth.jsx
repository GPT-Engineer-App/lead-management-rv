import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole"); // This should be replaced with actual authentication logic

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;