import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  //la parte de ...props esta para, cualquiera otra cosa que no sea el path, se extraiga tal cual como se agrega en el componente y pasarlo directamente abajo, haciendo este archivo reutilizable
  const isAuthenticated = useSelector((state) => state.actualUser);

  if (isAuthenticated && isAuthenticated.role_id !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
