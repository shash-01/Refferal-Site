import { useEffect, useState } from "react";
import api from "../../api/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/notifications");

      setNotifications(response.data.notifications);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);

      setNotifications((current) =>
        current.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to mark notification as read"
      );
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      setNotifications((current) =>
        current.filter(
          (notification) => notification._id !== id
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to delete notification"
      );
    }
  };

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div>
      <h1>Notifications</h1>

      {error && <p>{error}</p>}

      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id}>
            <p>
              <strong>
                {notification.type}
              </strong>
            </p>

            <p>{notification.message}</p>

            <p>
              {notification.isRead
                ? "Read"
                : "Unread"}
            </p>

            {!notification.isRead && (
              <button
                onClick={() =>
                  markAsRead(notification._id)
                }
              >
                Mark as Read
              </button>
            )}

            <button
              onClick={() =>
                deleteNotification(notification._id)
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;