import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateProfile = ({ children }) => {
  
  const isAuthenticated = useSelector((state) => state.userEmail);

  if (isAuthenticated?.length === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateProfile;