import { useEffect, useState } from "react";
import API from "../api";
import { socket } from "../socket";

function DashboardStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEmergencies();

    socket.on("receiveEmergency", (newEmergency) => {
      setData((prev) => [newEmergency, ...prev]);
    });

    socket.on("deleteEmergency", (id) => {
      setData((prev) => prev.filter((e) => e._id !== id));
    });

    socket.on("updateEmergency", (updated) => {
      setData((prev) =>
        prev.map((e) =>
          e._id === updated._id ? updated : e
        )
      );
    });

    return () => {
      socket.off("receiveEmergency");
      socket.off("deleteEmergency");
      socket.off("updateEmergency");
    };
  }, []);

  const fetchEmergencies = async () => {
    try {
      const res = await API.get("/emergency");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const total = data.length;
  const active = data.filter((e) => e.status === "active").length;
  const resolved = data.filter((e) => e.status === "resolved").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* Total */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center">
        <div className="text-5xl mb-3">📊</div>

        <h3 className="text-gray-500 text-sm uppercase tracking-wide">
          Total Emergencies
        </h3>

        <p className="text-4xl font-bold mt-2 text-gray-800">
          {total}
        </p>
      </div>

      {/* Active */}
      <div className="bg-red-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-red-200">
        <div className="text-5xl mb-3">🚨</div>

        <h3 className="text-red-600 text-sm uppercase tracking-wide">
          Active Cases
        </h3>

        <p className="text-4xl font-bold mt-2 text-red-600">
          {active}
        </p>
      </div>

      {/* Resolved */}
      <div className="bg-green-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-green-200">
        <div className="text-5xl mb-3">✅</div>

        <h3 className="text-green-600 text-sm uppercase tracking-wide">
          Resolved Cases
        </h3>

        <p className="text-4xl font-bold mt-2 text-green-600">
          {resolved}
        </p>
      </div>

    </div>
  );
}

export default DashboardStats;