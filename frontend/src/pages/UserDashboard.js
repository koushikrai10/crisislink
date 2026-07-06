import SOSButton from "../components/SOSButton";
import MyEmergencies from "../components/MyEmergencies";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          <div>
            <h1 className="text-3xl font-bold">
              🚨 CrisisLink
            </h1>

            <p className="text-blue-100">
              User Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="hidden md:block font-medium">
              👋 Welcome, {user?.name}
            </span>

            <button
              onClick={logout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-6">

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold">
            Welcome, {user?.name}! 👋
          </h2>

          <p className="mt-2 text-blue-100">
            Report emergencies quickly and track the status of your requests in real time.
          </p>

        </div>

        {/* SOS Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-red-600 mb-2">
            🚨 Emergency SOS
          </h2>

          <p className="text-gray-500 mb-6">
            Select the emergency type and submit your request.
          </p>

          <SOSButton />

        </div>

        {/* My Emergencies */}
        <MyEmergencies />

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">

        © 2026{" "}
        <span className="font-semibold text-blue-600">
          CrisisLink
        </span>

        {" "}• User Portal

      </footer>

    </div>
  );
}

export default UserDashboard;