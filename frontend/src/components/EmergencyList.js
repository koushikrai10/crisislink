import { useEffect, useState } from "react";
import API from "../api";
import { socket } from "../socket";

function EmergencyList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
        prev.map((e) => (e._id === updated._id ? updated : e))
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

  const deleteEmergency = async (id) => {
    if (!window.confirm("Delete this emergency?")) return;

    try {
      await API.delete(`/emergency/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // Resolve only
  const toggleStatus = async (id) => {
    try {
      await API.put(`/emergency/${id}`, {
        status: "resolved",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = data.filter((e) => {
    const matchesSearch = e.userName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || e.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded-lg font-medium transition hover:scale-105 ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-5 py-2 rounded-lg font-medium transition hover:scale-105 ${
            filter === "active"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("resolved")}
          className={`px-5 py-2 rounded-lg font-medium transition hover:scale-105 ${
            filter === "resolved"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Resolved
        </button>

      </div>

      {filteredData.length === 0 ? (

        <div className="text-center py-16">

          <div className="text-6xl">📭</div>

          <h3 className="text-2xl font-bold mt-4">
            No Emergencies Found
          </h3>

          <p className="text-gray-500 mt-2">
            New emergency reports will appear here.
          </p>

        </div>

      ) : (

        filteredData.map((e) => (

          <div
            key={e._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 mb-5"
          >

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

              <div>

                <h3 className="text-xl font-bold text-gray-800">
                  👤 {e.userName}
                </h3>

                <div className="flex flex-wrap gap-3 mt-3">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🚑 {e.type}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      e.status === "active"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {e.status.toUpperCase()}
                  </span>

                </div>

                <p className="text-gray-500 mt-4 text-sm">
                  🕒 {new Date(e.createdAt).toLocaleString()}
                </p>

              </div>

              <div className="flex gap-3 mt-5 md:mt-0">

                {e.status === "active" ? (
                  <button
                    onClick={() => toggleStatus(e._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    ✔ Resolve
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed"
                  >
                    ✅ Resolved
                  </button>
                )}

                <button
                  onClick={() => deleteEmergency(e._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default EmergencyList;