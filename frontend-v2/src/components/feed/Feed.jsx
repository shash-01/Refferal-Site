import { useEffect, useState } from "react";
import api from "../../api/axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/referral-posts");

      setPosts(response.data.posts);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load referral posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading referral posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Referral Feed</h1>

      {posts.length === 0 ? (
        <p>No referral posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>

            <p>
              <strong>Company:</strong>{" "}
              {post.company}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {post.jobRole}
            </p>

            <p>{post.description}</p>

            <p>
              Posted by:{" "}
              {post.postedBy?.name}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;