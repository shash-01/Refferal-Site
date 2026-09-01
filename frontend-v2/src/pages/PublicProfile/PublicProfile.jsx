import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const PublicProfile = () => {
  // ==================== URL PARAMETER ====================

  const { username } = useParams();


  // ==================== STATE ====================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==================== FETCH PUBLIC PROFILE ====================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/users/profile/${username}`
      );

      setUser(response.data.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };


  // ==================== LOAD PROFILE ====================

  useEffect(() => {
    fetchProfile();
  }, [username]);


  // ==================== LOADING STATE ====================

  if (loading) {
    return <p>Loading profile...</p>;
  }


  // ==================== ERROR STATE ====================

  if (error) {
    return <p>{error}</p>;
  }


  // ==================== USER NOT FOUND ====================

  if (!user) {
    return <p>User not found.</p>;
  }


  // ==================== PUBLIC PROFILE ====================

  return (
    <div>

      {/* ==================== PROFILE HEADER ==================== */}

      <h1>{user.name}</h1>

      <p>
        @{user.username}
      </p>


      {/* ==================== PROFILE PICTURE ==================== */}

      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt={user.name}
          width="150"
        />
      )}


      {/* ==================== BASIC INFORMATION ==================== */}

      <h2>About</h2>

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


      {/* ==================== SKILLS ==================== */}

      <h2>Skills</h2>

      {user.skills?.length ? (
        <ul>
          {user.skills.map((skill, index) => (
            <li key={index}>
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills added.</p>
      )}


      {/* ==================== EXPERIENCE ==================== */}

      <h2>Experience</h2>

      {user.experience?.length ? (
        user.experience.map((item, index) => (
          <div key={index}>
            <h3>{item.role}</h3>
            <p>{item.company}</p>
            <p>{item.duration}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No experience added.</p>
      )}


      {/* ==================== EDUCATION ==================== */}

      <h2>Education</h2>

      {user.education?.length ? (
        user.education.map((item, index) => (
          <div key={index}>
            <h3>{item.degree}</h3>
            <p>{item.college}</p>
            <p>{item.year}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No education added.</p>
      )}


      {/* ==================== SOCIAL LINKS ==================== */}

      <h2>Links</h2>

      {user.linkedinUrl && (
        <p>
          <a
            href={user.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
      )}

      {user.githubUrl && (
        <p>
          <a
            href={user.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      )}

    </div>
  );
};

export default PublicProfile;