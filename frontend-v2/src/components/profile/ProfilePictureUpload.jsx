import { useRef, useState } from "react";
import api from "../../api/axios";

const ProfilePictureUpload = ({ onUploaded }) => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // OPEN FILE PICKER
  // =========================================================

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // =========================================================
  // UPLOAD PROFILE PICTURE
  // =========================================================

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("profilePicture", file);

      const response = await api.post(
        "/users/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Profile picture updated successfully.");

      if (onUploaded) {
        onUploaded(response.data.profilePicture);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to upload profile picture."
      );
    } finally {
      setUploading(false);

      // Allow selecting the same file again
      event.target.value = "";
    }
  };

  return (
    <div className="profile-picture-upload">

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden-file-input"
      />

      {/* Upload button */}
      <button
        type="button"
        className="upload-photo-button"
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload New Photo"}
      </button>

      {/* Status */}
      {message && (
        <p className="upload-success">
          {message}
        </p>
      )}

      {error && (
        <p className="upload-error">
          {error}
        </p>
      )}

    </div>
  );
};

export default ProfilePictureUpload;