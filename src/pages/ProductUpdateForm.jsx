import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE_URL = "https://es-back-xv9z.onrender.com/api/products";

const ProductUpdateForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    stock: "",
    brand: "",
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${slug}`);
        const product = res.data.payload;
        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          discountPrice: product.discountPrice || "",
          quantity: product.quantity || "",
          stock: product.stock || "",
          brand: product.brand || "",
          category: product.category?._id || product.category || "",
        });
      } catch (err) {
        toast.error("প্রোডাক্ট ডাটা লোড করতে সমস্যা হয়েছে!", err);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("price", formData.price);
    dataToSend.append("discountPrice", formData.discountPrice);
    dataToSend.append("quantity", formData.quantity);
    dataToSend.append("stock", formData.stock);
    dataToSend.append("brand", formData.brand);
    dataToSend.append("category", formData.category);

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        dataToSend.append("images", images[i]);
      }
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/${slug}`,
        dataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Product Updated Successfully!");
        navigate("/products");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-10 border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Edit Product</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Product Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Brand Name</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg h-32 focus:ring-2 focus:ring-blue-400 outline-none transition" required></textarea>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Discount Price</label>
          <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Stock Quantity</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Category ID</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
        </div>

        <div className="md:col-span-2 flex flex-col bg-blue-50 p-4 rounded-lg border-2 border-dashed border-blue-200">
          <label className="font-semibold text-blue-800 mb-2">Update Product Images (Optional)</label>
          <input type="file" multiple onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
          <p className="mt-2 text-xs text-gray-500">*যদি ইমেজ পরিবর্তন করতে না চান তবে এটি খালি রাখুন।</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`md:col-span-2 py-3.5 rounded-xl font-bold text-white shadow-md transition-all active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Updating Product...
            </div>
          ) : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProductUpdateForm;