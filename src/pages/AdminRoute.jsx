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

  if (loading) return <div className="text-center py-10">
                  <div className="flex justify-center items-center h-screen gap-2">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin flex items-center"></div>
                    <span>Loading products...</span>
                  </div>
                </div>
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default AdminRoute;
