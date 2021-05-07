import { Navigate, Route } from "react-router";
import { useAuthContext } from "../../Context";

export const PrivateRoute = ({ path, ...props }) => {
  const { userData } = useAuthContext();
  return null!==userData ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/" state={{ from: path }} />
  );
};
