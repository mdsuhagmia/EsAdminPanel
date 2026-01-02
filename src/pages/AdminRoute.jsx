import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://es-back-xv9z.onrender.com/api/auth/me", { withCredentials: true });
        if (res.data.user.isAdmin) setIsAuth(true);
        else setIsAuth(false);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p className="text-blue-500 font-bold font-open flex justify-center items-center h-screen text-2xl">Loading...</p>;
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default AdminRoute;
