import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    setMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChat();
  const { token, user } = useAuth();
  const messageEndRef = useRef(null);
  const { theme } = useTheme();

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/message/${selectedUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      subscribeToMessages(); // 👈 Realtime subscription
    }

    return () => {
      unsubscribeFromMessages(); // 👈 Clean up
    };
  }, [selectedUser]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      data-theme={theme}
      className="flex-1 w-full h-full flex flex-col overflow-hidden bg-base-100"
    >
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => {
          const isSent = message.senderId === user.id;
          const isLast = idx === messages.length - 1;

          return (
            <div
              key={message._id}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
              ref={isLast ? messageEndRef : null}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                  isSent
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
                <p
                  className={`text-[10px] mt-1.5 ${
                    isSent ? "text-primary-content/70" : "text-base-content/70"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
