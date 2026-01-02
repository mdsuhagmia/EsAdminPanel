import { useState } from "react";

const AdminProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="">
      <div className="relative">
        <label htmlFor="profileUpload" className="cursor-pointer">
          <img
            src={
              profileImage
                ? profileImage
                : "https://res.cloudinary.com/dsop6eztf/image/upload/v1767327251/logo_ruo2bj.png"
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
        </label>
        <input
          type="file"
          id="profileUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AdminProfileImage;
