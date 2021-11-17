import { useAppData } from "../Contexts/AppDataContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, ...props }) {
  let [appData] = useAppData();
  const { loggedInUser } = appData;
  if (!loggedInUser) return <Navigate to="/login" />;

  return <>{children}</>;
}
