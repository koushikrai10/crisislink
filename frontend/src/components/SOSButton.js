import { useState } from "react";
import API from "../api";

function SOSButton() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Medical");

  const sendSOS = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const data = {
        userName: user?.name || "Unknown User",
        type,
        status: "active",
      };

      await API.post("/emergency", data);

      alert("🚨 Emergency reported successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to send emergency.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-md">

        <h2 className="text-2xl font-bold text-red-600 text-center">
          🚨 Emergency SOS
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Select the emergency type and report it instantly.
        </p>

        <label className="block font-semibold mb-2">
          Emergency Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="Medical">🚑 Medical Emergency</option>
          <option value="Fire">🔥 Fire</option>
          <option value="Accident">🚗 Road Accident</option>
          <option value="Crime">🚔 Crime / Theft</option>
          <option value="Other">⚠️ Other</option>
        </select>

        <button
          onClick={sendSOS}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-lg font-bold text-white transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:scale-105"
          }`}
        >
          {loading ? "Sending..." : "🚨 SEND SOS"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Use this button only in genuine emergency situations.
        </p>

      </div>

    </div>
  );
}

export default SOSButton;