import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import SOSButton from "./components/SOSButton";
import EmergencyList from "./components/EmergencyList";
import DashboardStats from "./components/DashboardStats";

// Protected Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

// Dashboard
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          <div>
            <h1 className="text-3xl font-bold">🚨 CrisisLink</h1>
            <p className="text-red-100 text-sm">
              Emergency Response Management System
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="hidden md:block font-medium">
              👋 Welcome, {user?.name || "User"}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">

        {/* Dashboard Statistics */}
        <DashboardStats />

        {/* SOS Card */}
        <div className="mt-6">
          <SOSButton />
        </div>

        {/* Emergency List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📋 Live Emergencies
          </h2>

          <EmergencyList />

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">

        © 2026{" "}
        <span className="font-semibold text-red-600">
          CrisisLink
        </span>

        {" "}• Built with React, Node.js, Express & MongoDB

      </footer>

    </div>
  );
}

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;