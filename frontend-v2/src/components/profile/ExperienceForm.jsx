import { useState } from "react";
import api from "../../api/axios";

const ExperienceForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/users/experience",
        form
      );

      setForm({
        company: "",
        role: "",
        duration: "",
      });

      onAdded(response.data.experience);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to add experience"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Add Experience</h4>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Experience"}
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;