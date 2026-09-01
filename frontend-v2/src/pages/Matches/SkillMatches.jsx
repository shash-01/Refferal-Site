import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const SkillMatches = () => {
  // ==================== STATE ====================

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  // ==================== FETCH SKILL MATCHES ====================

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await api.get("/users/matches");

      setMatches(response.data.matches || []);

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load skill matches"
      );
    } finally {
      setLoading(false);
    }
  };


  // ==================== LOAD MATCHES ====================

  useEffect(() => {
    fetchMatches();
  }, []);


  // ==================== LOADING STATE ====================

  if (loading) {
    return <p>Finding people with matching skills...</p>;
  }


  // ==================== ERROR STATE ====================

  if (error) {
    return (
      <div>
        <h1>Skill Matches</h1>
        <p>{error}</p>

        <button onClick={fetchMatches}>
          Try Again
        </button>
      </div>
    );
  }


  // ==================== NO SKILLS MESSAGE ====================

  if (message && matches.length === 0) {
    return (
      <div>
        <h1>Skill Matches</h1>
        <p>{message}</p>
      </div>
    );
  }


  // ==================== NO MATCHES ====================

  if (matches.length === 0) {
    return (
      <div>
        <h1>Skill Matches</h1>
        <p>
          No users with matching skills were found.
        </p>
      </div>
    );
  }


  // ==================== MATCHES PAGE ====================

  return (
    <div>

      {/* ==================== PAGE HEADER ==================== */}

      <h1>Skill Matches</h1>

      <p>
        People whose skills match your profile.
      </p>


      {/* ==================== MATCH COUNT ==================== */}

      <h2>
        {matches.length}{" "}
        {matches.length === 1
          ? "Match"
          : "Matches"}
      </h2>


      {/* ==================== MATCH RESULTS ==================== */}

      {matches.map((match) => {

        const user = match.user;

        return (
          <div key={user._id}>

            {/* ==================== USER PROFILE ==================== */}

            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.name}
                width="100"
              />
            )}

            <h3>{user.name}</h3>

            <p>
              @{user.username || "username not added"}
            </p>


            {/* ==================== PROFESSIONAL INFORMATION ==================== */}

            <p>
              <strong>Company:</strong>{" "}
              {user.company || "Not added"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user.role || "Not added"}
            </p>

            <p>
              <strong>Bio:</strong>{" "}
              {user.bio || "Not added"}
            </p>


            {/* ==================== MATCHING SKILLS ==================== */}

            <h4>Matching Skills</h4>

            {match.matchingSkills?.length ? (
              <ul>
                {match.matchingSkills.map(
                  (skill, index) => (
                    <li key={index}>
                      {skill}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p>No matching skills.</p>
            )}


            {/* ==================== MATCH SCORE ==================== */}

            <p>
              <strong>
                Match Score:
              </strong>{" "}
              {match.matchScore}%
            </p>


            {/* ==================== VIEW PROFILE ==================== */}

            {user.username && (
              <Link
                to={`/profile/${user.username}`}
              >
                View Profile
              </Link>
            )}

            <hr />

          </div>
        );
      })}


      {/* ==================== REFRESH MATCHES ==================== */}

      <button onClick={fetchMatches}>
        Refresh Matches
      </button>

    </div>
  );
};

export default SkillMatches;