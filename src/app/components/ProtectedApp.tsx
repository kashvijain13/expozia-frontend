import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

export default function ProtectedApp() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        // This hits: GET /api/auth/me
        await api.get("/auth/me");

        setAuthorized(true);
      } catch (err) {
        localStorage.removeItem("auth_token");
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#210B2C] text-white">
        Checking session...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}