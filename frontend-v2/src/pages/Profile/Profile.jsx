import { useEffect, useState } from "react";
import api from "../../api/axios";

import EditProfile from "../../components/profile/EditProfile";
import ExperienceForm from "../../components/profile/ExperienceForm";
import EducationForm from "../../components/profile/EducationForm";
import FileUpload from "../../components/profile/FileUpload";
import ProfilePictureUpload from "../../components/profile/ProfilePictureUpload";
import "./Profile.css";

const Profile = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);


  // =========================================================
  // FETCH PROFILE
  // =========================================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users/profile");

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


  // =========================================================
  // LOAD PROFILE ON PAGE LOAD
  // =========================================================

  useEffect(() => {
    fetchProfile();
  }, []);


  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }


  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error) {
    return (
      <div className="profile-error">
        <h3>Unable to load profile</h3>
        <p>{error}</p>

        <button onClick={fetchProfile}>
          Try Again
        </button>
      </div>
    );
  }


  // =========================================================
  // USER NOT FOUND
  // =========================================================

  if (!user) {
    return (
      <div className="profile-empty">
        <h3>User not found</h3>
        <p>We couldn't find your profile.</p>
      </div>
    );
  }


  // =========================================================
  // EDIT PROFILE
  // =========================================================

  if (editing) {
    return (
      <div className="profile-page">
        <EditProfile
          user={user}
          onUpdated={(updatedUser) => {
            setUser(updatedUser);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }


  // =========================================================
  // PROFILE HEADER
  // =========================================================

  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";


  return (
    <div className="profile-page">


      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <section className="profile-header-card">

        <div className="profile-cover">
          <div className="cover-pattern"></div>
        </div>


        <div className="profile-header-content">

          <div className="profile-photo-wrapper">

            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="profile-photo"
              />
            ) : (
              <div className="profile-photo-placeholder">
                {initials}
              </div>
            )}

          </div>


          <div className="profile-main-info">

            <h1>
              {user.name}
            </h1>

            <p className="profile-headline">
              {user.role || "Professional"}
            </p>

            <p className="profile-company">
              {user.company || "Company not added"}
            </p>

            <p className="profile-username">
              @{user.username || "username"}
            </p>

          </div>


          <button
            className="edit-profile-button"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>

        </div>

      </section>


      {/* =====================================================
          PROFILE PICTURE
      ===================================================== */}

      {/* =====================================================
    PROFILE PICTURE
===================================================== */}

<section className="profile-section upload-section">

  <div className="section-heading">
    <div>
      <h2>Profile Picture</h2>

      <p>
        Keep your professional profile photo up to date.
      </p>
    </div>
  </div>

  <ProfilePictureUpload
    onUploaded={(profilePicture) => {
      setUser((current) => ({
        ...current,
        profilePicture,
      }));
    }}
  />

</section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">
          <h2>About</h2>
        </div>

        <div className="about-content">

          {user.bio ? (
            <p>{user.bio}</p>
          ) : (
            <p className="empty-text">
              Add a short description about yourself.
            </p>
          )}

        </div>

      </section>


      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">
          <h2>Contact & Professional Information</h2>
        </div>

        <div className="info-grid">

          <div className="info-item">
            <span className="info-label">
              Email
            </span>

            <span className="info-value">
              {user.email}
            </span>
          </div>


          <div className="info-item">
            <span className="info-label">
              Company
            </span>

            <span className="info-value">
              {user.company || "Not added"}
            </span>
          </div>


          <div className="info-item">
            <span className="info-label">
              Role
            </span>

            <span className="info-value">
              {user.role || "Not added"}
            </span>
          </div>


          <div className="info-item">
            <span className="info-label">
              Username
            </span>

            <span className="info-value">
              @{user.username || "Not added"}
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">
          <h2>Skills</h2>
        </div>

        {user.skills?.length ? (

          <div className="skills-container">

            {user.skills.map((skill, index) => (
              <span
                className="skill-pill"
                key={index}
              >
                {skill}
              </span>
            ))}

          </div>

        ) : (

          <p className="empty-text">
            No skills added yet.
          </p>

        )}

      </section>


      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">
          <div>
            <h2>Experience</h2>
            <p>Your professional experience.</p>
          </div>
        </div>


        {user.experience?.length ? (

          <div className="timeline">

            {user.experience.map((item, index) => (

              <div
                className="timeline-item"
                key={index}
              >

                <div className="timeline-dot"></div>

                <div className="timeline-content">

                  <h3>
                    {item.role}
                  </h3>

                  <p className="timeline-company">
                    {item.company}
                  </p>

                  <p className="timeline-duration">
                    {item.duration}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="empty-text">
            No experience added yet.
          </p>

        )}


        <div className="add-section">

          <h3>Add Experience</h3>

          <ExperienceForm
            onAdded={(experience) => {
              setUser((current) => ({
                ...current,
                experience,
              }));
            }}
          />

        </div>

      </section>


      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">
          <h2>Education</h2>
        </div>


        {user.education?.length ? (

          <div className="education-list">

            {user.education.map((item, index) => (

              <div
                className="education-item"
                key={index}
              >

                <div className="education-icon">
                  🎓
                </div>

                <div>

                  <h3>
                    {item.degree}
                  </h3>

                  <p>
                    {item.college}
                  </p>

                  <span>
                    {item.year}
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="empty-text">
            No education added yet.
          </p>

        )}


        <div className="add-section">

          <h3>Add Education</h3>

          <EducationForm
            onAdded={(education) => {
              setUser((current) => ({
                ...current,
                education,
              }));
            }}
          />

        </div>

      </section>


      {/* =====================================================
          LINKS
      ===================================================== */}

      <section className="profile-section">

        <div className="section-heading">
          <h2>Links</h2>
        </div>

        <div className="links-list">

          {user.linkedinUrl && (
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="profile-link"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>
          )}

          {user.githubUrl && (
            <a
              href={user.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="profile-link"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
          )}

          {!user.linkedinUrl &&
            !user.githubUrl && (
              <p className="empty-text">
                No links added yet.
              </p>
            )}

        </div>

      </section>


      {/* =====================================================
          RESUME
      ===================================================== */}

      <section className="profile-section resume-section">

        <div className="section-heading">

          <div>
            <h2>Resume</h2>
            <p>
              Share your latest resume with recruiters
              and referral providers.
            </p>
          </div>

        </div>


        {user.resumeUrl ? (

          <div className="resume-card">

            <div className="resume-icon">
              📄
            </div>

            <div className="resume-info">

              <strong>
                Resume
              </strong>

              <span>
                Your uploaded resume
              </span>

            </div>

            <a
              href={user.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="resume-button"
            >
              View Resume
            </a>

          </div>

        ) : (

          <p className="empty-text">
            No resume uploaded yet.
          </p>

        )}


        <div className="add-section">

          <h3>Upload Resume</h3>

          <FileUpload />

        </div>

      </section>

    </div>
  );
};

export default Profile;