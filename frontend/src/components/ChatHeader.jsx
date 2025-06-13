import React from "react";
import { useChat } from "../context/ChatContext";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar (1).png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User Name & Status */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">Offline</p>
          </div>
        </div>

        {/* Close Button (non-functional) */}
        <button>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
