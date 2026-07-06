import { useEffect, useState } from "react";
import API from "../api";
import { socket } from "../socket";

function MyEmergencies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMyEmergencies();

    socket.on("receiveEmergency", fetchMyEmergencies);
    socket.on("updateEmergency", fetchMyEmergencies);
    socket.on("deleteEmergency", fetchMyEmergencies);

    return () => {
      socket.off("receiveEmergency", fetchMyEmergencies);
      socket.off("updateEmergency", fetchMyEmergencies);
      socket.off("deleteEmergency", fetchMyEmergencies);
    };
  }, []);

  const fetchMyEmergencies = async () => {
    try {
      const res = await API.get("/emergency/my");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📋 My Emergencies
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl">📭</div>

          <h3 className="text-xl font-bold mt-4">
            No Emergencies Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Your emergency reports will appear here.
          </p>
        </div>
      ) : (
        data.map((e) => (
          <div
            key={e._id}
            className="border rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-lg font-bold">
                  🚑 {e.type}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  🕒 {new Date(e.createdAt).toLocaleString()}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  e.status === "active"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {e.status.toUpperCase()}
              </span>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default MyEmergencies;