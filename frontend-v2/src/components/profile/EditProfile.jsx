import { useState } from "react";
import api from "../../api/axios";

const EditProfile = ({ user, onUpdated, onCancel }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    company: user?.company || "",
    role: user?.role || "",
    skills: user?.skills?.join(", ") || "",
  });

  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      const response = await api.put("/users/profile", {
        name: form.name,
        company: form.company,
        role: form.role,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      onUpdated(response.data.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Company</label>
          <br />
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Role</label>
          <br />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Skills</label>
          <br />
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Node.js, MongoDB, AWS"
          />
          <p>Separate skills with commas.</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {" "}

        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;