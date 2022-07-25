import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <>
      {userInfo === null ? (
        <Navigate to="/auth/signin" state={{ from: location }} replace />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;