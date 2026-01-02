import axios from "axios";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {

 const handleLogout = async () => {
  try {
    await axios.post("https://es-back-xv9z.onrender.com/api/auth/logout", {}, { withCredentials: true });
    
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return <div onClick={handleLogout} className="flex items-center gap-x-2 hover:bg-red-400 w-full py-2 group rounded">
    <div>
      <LuLogOut className="group-hover:text-white text-black ml-4" />
    </div>
    <button className=" group-hover:text-white text-black rounded cursor-pointer">Logout</button>
  </div>;
};

export default LogoutButton;
