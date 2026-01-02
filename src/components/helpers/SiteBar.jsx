import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import LogoutButton from "../LogoutButton";

const menu = [
  { name: "Dashboard", path: "/", icon: <MdDashboard /> },
  { name: "Products", path: "/products", icon: <MdInventory /> },
  { name: "Orders", path: "/orders", icon: <MdShoppingCart /> },
  { name: "Users", path: "/users", icon: <MdPeople /> },
  { name: "Settings", path: "/settings", icon: <MdSettings /> },
];

const SiteBar = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-x-3 px-3 py-2 rounded 
                 transition ${
                   isActive
                     ? "bg-blue-500 text-white"
                     : "text-gray-700 hover:bg-gray-100"
                 }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
        <h2 className="w-full cursor-pointer">
        <LogoutButton/>
      </h2>
      </ul>
    </div>
  );
};

export default SiteBar;
