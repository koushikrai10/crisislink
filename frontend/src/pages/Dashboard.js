import { useNavigate } from "react-router-dom";

import DashboardStats from "../components/DashboardStats";
import SOSButton from "../components/SOSButton";
import EmergencyList from "../components/EmergencyList";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          🚨 CrisisLink Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto p-5">

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* SOS Section */}
        <div className="bg-white rounded-xl shadow-md p-5 mt-5">
          <h2 className="text-xl font-semibold mb-4">
            🚨 Trigger Emergency
          </h2>

          <div className="flex justify-center">
            <SOSButton />
          </div>
        </div>

        {/* Emergency List */}
        <div className="bg-white rounded-xl shadow-md p-5 mt-5">
          <h2 className="text-xl font-semibold mb-4">
            📋 Live Emergencies
          </h2>

          <EmergencyList />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;