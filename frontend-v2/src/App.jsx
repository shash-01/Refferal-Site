import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Notifications from "./pages/Notifications/Notifications";
import Profile from "./pages/Profile/Profile";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import SearchUsers from "./pages/Search/SearchUsers";
import SkillMatches from "./pages/Matches/SkillMatches";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== ROOT ==================== */}

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />


        {/* ==================== AUTH ROUTES ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================== DASHBOARD LAYOUT ==================== */}

        <Route element={<DashboardLayout />}>

          {/* ==================== DASHBOARD ==================== */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* ==================== NOTIFICATIONS ==================== */}

          <Route
            path="/notifications"
            element={<Notifications />}
          />


          {/* ==================== MY PROFILE ==================== */}

          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* ==================== PUBLIC PROFILE ==================== */}

          <Route
            path="/profile/:username"
            element={<PublicProfile />}
          />


          {/* ==================== FIND PEOPLE ==================== */}

          <Route
            path="/search"
            element={<SearchUsers />}
          />


          {/* ==================== SKILL MATCHES ==================== */}

          <Route
            path="/matches"
            element={<SkillMatches />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;