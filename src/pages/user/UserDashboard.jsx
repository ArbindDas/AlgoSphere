// UserDashboard.jsx - Auto-redirect admins away
import withAuth from "../../context/hoc/withAuth";

const UserDashboard = ({ user }) => {
  // Only regular users will see this
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome {user.email}!</p>
    </div>
  );
};

export default withAuth(UserDashboard, [], true); // autoRedirect = true