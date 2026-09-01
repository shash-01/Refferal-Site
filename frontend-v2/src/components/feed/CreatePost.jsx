import { useState } from "react";
import api from "../../api/axios";

const CreatePost = ({ onPostCreated }) => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    jobRole: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post(
        "/referral-posts",
        form
      );

      setSuccess("Referral post created successfully.");

      setForm({
        title: "",
        company: "",
        jobRole: "",
        description: "",
      });

      if (onPostCreated) {
        onPostCreated(response.data.post);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to create referral post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Referral Post</h2>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Job Role</label>
          <input
            type="text"
            name="jobRole"
            value={form.jobRole}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;