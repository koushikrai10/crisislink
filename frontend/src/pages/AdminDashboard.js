import { useNavigate } from "react-router-dom";

import DashboardStats from "../components/DashboardStats";
import EmergencyList from "../components/EmergencyList";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <div>
            <h1 className="text-3xl font-bold">
              🚨 CrisisLink
            </h1>

            <p className="text-red-100">
              Admin Control Panel
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="hidden md:block font-medium">
              👋 Welcome, {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-6">

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold">
            Welcome Admin 👋
          </h2>

          <p className="mt-2 text-red-100">
            Monitor, manage and respond to emergency reports across the platform.
          </p>

        </div>

        {/* Dashboard Statistics */}
        <DashboardStats />

        {/* Emergency Management */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            📋 Emergency Management
          </h2>

          <p className="text-gray-500 mb-6">
            View, search, filter, resolve and delete emergency reports.
          </p>

          <EmergencyList />

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">

        © 2026{" "}
        <span className="font-semibold text-red-600">
          CrisisLink
        </span>

        {" "}• Admin Portal

      </footer>

    </div>
  );
}

export default AdminDashboard;