import React, { useState } from "react";
import axios from "axios";

const ProductCreateForm = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    stock: "",
    weight: "",
    brand: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("quantity", formData.quantity);
    data.append("stock", formData.stock);
    data.append("weight", formData.weight);
    data.append("brand", formData.brand);
    data.append("category", formData.category);

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        "https://es-back-xv9z.onrender.com/api/products",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product Created Successfully!");
      console.log(response.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="flex flex-col">
          <label className="font-semibold">Title</label>
          <input type="text" name="title" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Brand</label>
          <input type="text" name="brand" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="font-semibold">Description</label>
          <textarea name="description" onChange={handleChange} className="border p-2 rounded h-24" required></textarea>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Price</label>
          <input type="number" name="price" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Discount Price</label>
          <input type="number" name="discountPrice" onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Quantity</label>
          <input type="number" name="quantity" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Stock</label>
          <input type="number" name="stock" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Category ID</label>
          <input type="text" name="category" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Weight (kg)</label>
          <input type="number" name="weight" onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="font-semibold">Product Images</label>
          <input type="file" multiple onChange={handleImageChange} className="border p-2 rounded" required />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreateForm;