import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
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
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      alert("Registration Successful!");

      navigate("/");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed.");

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
            Create your account
          </p>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;