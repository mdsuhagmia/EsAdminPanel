import axios from "axios";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Products = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API_URL = "https://es-back-xv9z.onrender.com/api/products";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      const fetchedData = data?.payload?.Products || data?.payload || [];
      setProducts(fetchedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateProduct = (slug) => {
    navigate(`/updateproduct/${slug}`);
  };

  const handleDeleteProduct = async (slug, title) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to permanently remove "${title}"? This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${API_URL}/${slug}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setProducts((prev) => prev.filter((item) => item.slug !== slug));

          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted from your database.",
            icon: "success",
          });

          fetchProducts();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Delete failed or Unauthorized"
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products ({products.length})</h1>
        <button
          onClick={() => navigate("/createproduct")}
          className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
        >
          + Add Product
        </button>
      </div>

      <div className="mb-4 relative w-full md:w-1/3">
        <input
          type="search"
          placeholder="Search product by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2.5 pl-5 pr-12 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <CiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading products...</span>
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-10 h-10 rounded object-cover border"
                      />
                      <span className="font-medium text-gray-700 line-clamp-2 text-[14px]">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">৳{product.price}</td>
                  <td className="px-4 py-4 text-gray-600">{product.stock}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-right">
                    <div className="inline-flex gap-x-4 text-xl">
                      <FiEdit
                        onClick={() => handleUpdateProduct(product.slug)}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                      />
                      <MdDeleteOutline
                        onClick={() =>
                          handleDeleteProduct(product.slug, product.title)
                        }
                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
