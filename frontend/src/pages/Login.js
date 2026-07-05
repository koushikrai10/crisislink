import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      // 🔥 Debug Response
      console.log("✅ Login Response:", res.data);

      // Save Token
      localStorage.setItem("token", res.data.token);

      // Save User
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Verify Storage
      console.log("✅ Token Saved:", localStorage.getItem("token"));
      console.log("✅ User Saved:", localStorage.getItem("user"));

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (err) {
      console.error("❌ Login Error:", err);

      alert(
        err.response?.data?.message || "Login Failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600">
            🚨 CrisisLink
          </h1>

          <p className="text-gray-500 mt-2">
            Emergency Response Management System
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;