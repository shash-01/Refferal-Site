import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const SearchUsers = () => {
  // ==================== STATE ====================

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    skill: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ==================== HANDLE INPUT ====================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ==================== SEARCH USERS ====================

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const params = {};

      if (form.name.trim()) {
        params.name = form.name.trim();
      }

      if (form.company.trim()) {
        params.company = form.company.trim();
      }

      if (form.role.trim()) {
        params.role = form.role.trim();
      }

      if (form.skill.trim()) {
        params.skill = form.skill.trim();
      }

      const response = await api.get(
        "/users/search",
        {
          params,
        }
      );

      setUsers(response.data.users);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to search users"
      );
    } finally {
      setLoading(false);
    }
  };


  // ==================== CLEAR SEARCH ====================

  const handleClear = () => {
    setForm({
      name: "",
      company: "",
      role: "",
      skill: "",
    });

    setUsers([]);
    setError("");
  };


  // ==================== UI ====================

  return (
    <div>

      {/* ==================== PAGE HEADER ==================== */}

      <h1>Find People</h1>

      <p>
        Search for people based on their
        profile information and skills.
      </p>


      {/* ==================== SEARCH FORM ==================== */}

      <form onSubmit={handleSearch}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skill"
          placeholder="Skill"
          value={form.skill}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>

      </form>


      {/* ==================== ERROR ==================== */}

      {error && <p>{error}</p>}


      {/* ==================== SEARCH RESULTS ==================== */}

      {!loading && users.length > 0 && (
        <div>

          <h2>
            Search Results ({users.length})
          </h2>

          {users.map((user) => (
            <div key={user._id}>

              {/* ==================== USER INFORMATION ==================== */}

              {user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  width="80"
                />
              )}

              <h3>{user.name}</h3>

              <p>
                @{user.username}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {user.company || "Not added"}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {user.role || "Not added"}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {user.skills?.length
                  ? user.skills.join(", ")
                  : "No skills added"}
              </p>


              {/* ==================== PUBLIC PROFILE LINK ==================== */}

              <Link
                to={`/profile/${user.username}`}
              >
                View Profile
              </Link>

              <hr />

            </div>
          ))}

        </div>
      )}


      {/* ==================== NO RESULTS ==================== */}

      {!loading &&
        users.length === 0 &&
        (form.name ||
          form.company ||
          form.role ||
          form.skill) && (
          <p>No users found.</p>
        )}

    </div>
  );
};

export default SearchUsers;