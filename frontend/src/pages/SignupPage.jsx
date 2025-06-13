import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken, connectSocket } = useAuth();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          fullName,
          email,
          password,
        }
      );
      setUser(response.data.user);
      setToken(response.data.token);
      connectSocket(response.data.user.id);
      alert("Sucessfully Registered");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white mt-16">
      {/* Left Side - Form */}
      <div className="md:w-1/2 w-full flex justify-center items-center px-6 md:px-16 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">Join ChatStream Today</h2>

          <form onSubmit={handleForm} className="space-y-5">
            <hr className="border-gray-700" />

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                What should we call you?
              </label>
              <input
                type="text"
                value={fullName}
                placeholder="e.g. Alex Carter"
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Your email
              </label>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Create a password
              </label>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login to ChatStream
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4">Welcome to ChatStream</h2>
          <h3 className="text-2xl font-bold mb-4">
            Connect. Share. Collaborate.
          </h3>
          <p className="mb-6 text-sm text-blue-100">
            Whether you're chatting with friends or collaborating with your
            team, ChatStream helps you stay connected — all in real time, from
            anywhere.
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              className="w-8 h-8 rounded-full border-2 border-white"
              alt="User"
            />
            <span className="text-sm text-white font-semibold">
              Join <strong>10,000+</strong> active users today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
