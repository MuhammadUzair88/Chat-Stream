import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { useChat } from "./context/ChatContext";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { theme } = useTheme();
  const { selectedUser } = useChat();
  const { onlineUsers, token } = useAuth();

  const isAuthenticated = !!token;
  console.log({ onlineUsers });

  return (
    <div className="w-full min-h-screen" data-theme={theme}>
      {!selectedUser && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <SignupPage />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <div className="flex flex-col min-h-screen w-full">
                <HomePage />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/settings" element={<Settings />} />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
