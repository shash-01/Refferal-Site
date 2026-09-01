import { useState } from "react";
import api from "../../api/axios";

const FileUpload = ({ type, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isResume = type === "resume";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      formData.append(
        isResume ? "resume" : "image",
        file
      );

      const endpoint = isResume
        ? "/users/resume"
        : "/users/profile-picture";

      const response = await api.post(
        endpoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(
        isResume
          ? "Resume uploaded successfully."
          : "Profile picture uploaded successfully."
      );

      setFile(null);

      if (onUploaded) {
        onUploaded(response.data);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>
        {isResume
          ? "Upload Resume"
          : "Upload Profile Picture"}
      </h4>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept={
            isResume
              ? ".pdf,.doc,.docx"
              : "image/*"
          }
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;