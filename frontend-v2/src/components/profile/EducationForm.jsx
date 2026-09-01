import { useState } from "react";
import api from "../../api/axios";

const EducationForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    college: "",
    degree: "",
    year: "",
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
        "/users/education",
        form
      );

      setForm({
        college: "",
        degree: "",
        year: "",
      });

      onAdded(response.data.education);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to add education"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Add Education</h4>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="college"
          placeholder="College"
          value={form.college}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={form.degree}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Education"}
        </button>
      </form>
    </div>
  );
};

export default EducationForm;