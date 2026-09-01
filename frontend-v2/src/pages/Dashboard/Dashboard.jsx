import Feed from "../../components/feed/Feed";
import CreatePost from "../../components/feed/CreatePost";

const Dashboard = () => {
  return (
    <div>
      <CreatePost />

      <hr />

      <Feed />
    </div>
  );
};

export default Dashboard;