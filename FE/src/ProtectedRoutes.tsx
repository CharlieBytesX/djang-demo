import { useObserver } from "centinel";
import { Outlet, useNavigate } from "react-router-dom";
import { authManager } from "./lib/auth";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const loggedIn = useObserver(authManager.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }

    return () => {};
  }, [loggedIn]);

  return <Outlet />;
}
