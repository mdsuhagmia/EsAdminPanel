import axios from "axios";
import { useEffect, useState } from "react";

const AdminBanner = () => {
  const [image, setImage] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 get banners
  const fetchBanners = async () => {
    const res = await axios.get("https://es-back-xv9z.onrender.com/api/banner", {
      withCredentials: true,
    });
    setBanners(res.data.payload.banner);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🔹 upload banner
  const uploadBanner = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post(
        "https://es-back-xv9z.onrender.com/api/banner",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Banner uploaded successfully");
      setImage(null);
      fetchBanners();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 delete banner
  const deleteBanner = async (id) => {
    if (!window.confirm("Are you sure to delete this banner?")) return;

    await axios.delete(
      `https://es-back-xv9z.onrender.com/api/banner/${id}`,
      { withCredentials: true }
    );

    fetchBanners();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Banner Management</h2>

      {/* Upload */}
      <form onSubmit={uploadBanner} className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          disabled={loading}
          className="ml-3 px-4 py-2 bg-orange-500 text-white"
        >
          {loading ? "Uploading..." : "Upload Banner"}
        </button>
      </form>

      {/* Banner List */}
      <div className="grid grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="border p-2">
            <img
              src={banner.image}
              alt="banner"
              className="h-40 w-full object-cover"
            />
            <button
              onClick={() => deleteBanner(banner._id)}
              className="mt-2 w-full bg-red-500 text-white py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBanner;