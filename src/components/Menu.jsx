import React, { useEffect, useState } from 'react'
import Container from './Container'
import logofull from '../assets/logofull.png'
import { Link } from 'react-router-dom'
import { IoMdNotificationsOutline } from 'react-icons/io'
import AdminProfileImage from './helpers/AdminProfileImage'
import { CiSearch } from 'react-icons/ci'
import toast from 'react-hot-toast'
import axios from 'axios'

const Menu = () => {
  const [loading, setLoading] = useState(false);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://es-back-xv9z.onrender.com/api/auth/refresh-token",
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Token generated successfully!");
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleManualRefresh();
      console.log("Auto-refreshing token...");
    }, 4 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);


  return (
    <nav className="py-2">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-12">
            <Link>
              <img src={logofull} className="w-28" alt="" />
            </Link>
            <div>
              <h1 className="text-[#03484e] text-2xl font-bold font-open">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <div className="w-[35%] relative">
            <input
              type="search"
              placeholder="Search data, users or reports"
              className="w-full py-2 pl-5 pr-12 rounded-full border border-gray-400 
               outline-none focus:border-gray-950 focus:ring-1 
               focus:ring-blue-200 transition"
            />
            <CiSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 
               text-xl text-gray-500 cursor-pointer"
            />
          </div>
          <div className="flex gap-x-6 items-center">
            <div>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className={`px-2 py-2 cursor-pointer rounded font-normal text-white transition-all 
                 ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600 active:scale-95" }`}
              >
                {loading ? "Refreshing..." : "🔄 Refresh Token"}
              </button>
            </div>
            <div>
              <IoMdNotificationsOutline className="text-4xl cursor-pointer hover:text-blue-500" />
            </div>
            <div>
              <AdminProfileImage />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Menu
