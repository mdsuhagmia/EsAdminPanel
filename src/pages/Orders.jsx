import React, { useEffect, useState } from 'react';
import { Eye, Truck, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import OrderPagination from '../components/OrderPagination';

const Orders = () => {

    const API_URL = "https://es-back-xv9z.onrender.com/api/order/allorders"

    const [orders, serOrders] = useState([])

    let [perPage, setPerPage] = useState(1);
    let [currentPage, setCurrentPage] = useState(1);

    let lastPage = perPage * currentPage;
    let firstPage = lastPage - perPage;
    let allPage = orders.slice(firstPage, lastPage);

    let pageNumber = [];
    for (let i = 0; i < Math.ceil(orders.length / perPage); i++) {
      pageNumber.push(i);
    }

    console.log(pageNumber);

  let paginate = (item) => {
    setCurrentPage(item + 1);
  };

  let next = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage((item) => item + 1);
    }
  };

  let prev = () => {
    if (currentPage > 1) {
      setCurrentPage((item) => item - 1);
    }
  };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(API_URL, {
          withCredentials: true,
        });

        console.log("Fetched Data:", data);

        const fetchedData = data?.orders || [];
        serOrders(fetchedData);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data?.message ||
            "Login session expired. Please login again."
        );
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCopyId = (id) => {
  navigator.clipboard.writeText(id); // এটি আইডিটি ক্লিপবোর্ডে কপি করবে
  toast.success("ID Copied to Clipboard!", {
    style: {
      borderRadius: '8px',
      background: '#4f46e5',
      color: '#fff',
    },
  });
};

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-500">Manage and track your customer orders</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {allPage.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div
                      onClick={() => handleCopyId(order._id)}
                      className="group relative flex items-center gap-2 cursor-pointer w-fit"
                      title="Click to copy full ID"
                    >
                      <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 transition-all">
                        #{order._id.substring(0, 5)}...
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center">
                        <div className="bg-gray-800 text-white text-xs py-1 px-3 rounded shadow-lg whitespace-nowrap">
                          Full ID: {order._id} (Click to Copy)
                        </div>
                        <div className="w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="Content-copy"
                        />
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {order.buyer.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold whitespace-nowrap">
                    ট {order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Ship Order"
                      >
                        <Truck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* (Pagination) */}
      <div className="flex justify-between items-center mt-6">
        <OrderPagination
          pageNumber={pageNumber}
          paginate={paginate}
          next={next}
          prev={prev}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Orders;