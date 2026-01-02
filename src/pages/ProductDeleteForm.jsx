// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// // API Base URL (একটি ভেরিয়েবলে রাখা ভালো যাতে বারবার লিখতে না হয়)
// const API_URL = "https://es-back-xv9z.onrender.com/api/products";

// const ProductDeleteForm = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ১. সব প্রোডাক্ট লোড করার ফাংশন
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(API_URL);
      
//       // আপনার ব্যাকএন্ডের payload এর ভেতর products আছে কি না চেক করে সেট করা
//       // এটি 'map is not a function' এরর প্রতিরোধ করবে
//       const fetchedData = data?.payload?.Products || data?.payload || [];
//       console.log(fetchedData)
//       setProducts(Array.isArray(fetchedData) ? fetchedData : []);

//     } catch (err) {
//       console.error("Fetch Error:", err.message);
//       setProducts([]); // এরর হলে খালি অ্যারে সেট করা নিরাপদ
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ২. ডিলিট হ্যান্ডেলার
//   const handleDelete = async (slug, title) => {

//     try {
//       Swal.fire({
//       title: "Are you sure?",
//       text: "You want to permanently remove this item? This action cannot be undone.!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`${API_URL}/${slug}`, { withCredentials: true });
//         setProducts((prev) => prev.filter((item) => item.slug !== slug));
//         Swal.fire({
//           title: "Products Deleted successfully!",
//           text: "Products delete successfully from your database",
//           icon: "success"
//         });
//       }
//     });
      
//     } catch (err) {
//       const errMsg = err.response?.data?.message || "Delete failed";
//       alert(errMsg);
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64 text-blue-500 font-semibold">
//       Loading products...
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
//         <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//           Total: {products.length}
//         </span>
//       </div>

//       <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
//             <tr>
//               <th className="p-4 font-semibold">Preview</th>
//               <th className="p-4 font-semibold">Product Title</th>
//               <th className="p-4 font-semibold">Price</th>
//               <th className="p-4 font-semibold text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <tr key={product._id} className="hover:bg-gray-50 transition-colors">
//                   <td className="p-4">
//                     <img 
//                       src={product.images?.[0] || "https://via.placeholder.com/50"} 
//                       alt={product.title} 
//                       className="w-12 h-12 object-cover rounded-lg shadow-sm" 
//                     />
//                   </td>
//                   <td className="p-4 font-medium text-gray-700">{product.title}</td>
//                   <td className="p-4 text-gray-600 font-semibold">${product.price}</td>
//                   <td className="p-4 text-center">
//                     <button
//                       onClick={() => handleDelete(product.slug, product.title)}
//                       className="bg-red-50 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-10 text-center text-gray-400 italic">
//                   No products found in the database.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductDeleteForm;