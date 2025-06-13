import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Make sure you have access to the socket

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { socket } = useAuth();

  // Subscribe to messages
  const subscribeToMessages = () => {
    if (!selectedUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser;
      if (!isFromSelectedUser) return;

      setMessages((prev) => [...prev, newMessage]);
    });
  };

  // Unsubscribe from messages
  const unsubscribeFromMessages = () => {
    if (socket) {
      socket.off("newMessage");
    }
  };

  // Manage subscription automatically on selectedUser change
  useEffect(() => {
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser, socket]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
