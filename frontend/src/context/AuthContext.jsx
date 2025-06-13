import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

export const AuthContext = createContext();

const BASE_URL = "http://localhost:5000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Sync localStorage on user/token change
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    if (token) localStorage.setItem("token", token);
  }, [user, token]);

  // Automatically connect socket when user is set
  useEffect(() => {
    if (user && user.id && !socket) {
      connectSocket(user.id);
    }
  }, [user, socket]);

  const connectSocket = (userId) => {
    if (!userId || socket) return;

    const newSocket = io(BASE_URL, {
      query: { userId },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    disconnectSocket();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        connectSocket,
        disconnectSocket,
        onlineUsers,
        setOnlineUsers,
        logout,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
