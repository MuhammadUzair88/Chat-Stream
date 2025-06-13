import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken, connectSocket } = useAuth();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user/login`,
        {
          email,
          password,
        }
      );
      setUser(response.data.user);
      setToken(response.data.token);
      connectSocket(response.data.user.id);
      alert("Successfully Logged In");
      navigate("/home"); // or /chat depending on your routing
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white mt-16">
      {/* Left Side - Form */}
      <div className="md:w-1/2 w-full flex justify-center items-center px-6 md:px-16 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">
            Welcome Back to ChatStream
          </h2>

          <form onSubmit={handleForm} className="space-y-5">
            <hr className="border-gray-700" />

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up for ChatStream
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4">Welcome to ChatStream</h2>
          <h3 className="text-2xl font-bold mb-4">
            Messaging made simple and secure.
          </h3>
          <p className="mb-6 text-sm text-blue-100">
            ChatStream lets you stay in touch with friends, family, and teams —
            securely and in real-time, from any device.
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              className="w-8 h-8 rounded-full border-2 border-white"
              alt="User"
            />
            <span className="text-sm text-white font-semibold">
              Trusted by <strong>global users</strong> every day
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
