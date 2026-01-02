import React, { useContext } from 'react'
import { ApiData } from '../components/context/ContextApi'
import { MdDeleteOutline } from 'react-icons/md'
import Swal from 'sweetalert2'
import axios from 'axios'

const Users = () => {
  const users = useContext(ApiData)
  const userList = users?.users || users || [];

  const handleDeleteUser = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if (result.isConfirmed) {
        await axios.delete(`https://es-back-xv9z.onrender.com/api/user/${id}`, { withCredentials: true })
        Swal.fire("Deleted!", "User has been deleted.", "success")
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
          Total Users: {userList.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold">User Info</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Ban</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {userList.length > 0 ? (
              userList.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-700">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isBan ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.isBan ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      className="p-2 hover:bg-red-50 rounded-full text-red-500 transition"
                    >
                      <MdDeleteOutline className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                  No users found or loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users