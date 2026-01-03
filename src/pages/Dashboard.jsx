import { useContext } from "react";
import { ApiData } from "../components/context/ContextApi";

const Dashboard = () => {

  let users = useContext(ApiData)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold">{users?.products ? users.products.length : 0}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Users</p>
           <h2 className="text-2xl font-bold">{users?.users ? users.users.length : 0}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
