import React from "react";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChat } from "../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useChat();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full min-h-screen">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
