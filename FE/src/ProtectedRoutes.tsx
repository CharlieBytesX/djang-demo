import { Outlet, useNavigate } from "react-router-dom";
import { authManager } from "./lib/auth";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const imlogged = async () => {
    const canAccess = await authManager.askServerIfImLoggedIn();
    if (!canAccess) {
      navigate("/login");
    }
  };
  useEffect(() => {
    imlogged();
  }, []);

  return <Outlet />;
}
