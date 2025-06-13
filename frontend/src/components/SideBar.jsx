import { useEffect } from "react";
import { Users } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

const Sidebar = () => {
  const { token, onlineUsers } = useAuth();
  const { users, setUsers, selectedUser, setSelectedUser } = useChat();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/message/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        console.error("Upload error:", err);
        alert("Failed to update profile picture");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  return (
    <aside
      className={`min-h-screen w-20 ${
        selectedUser ? " " : "mt-15"
      } lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100`}
    >
      {/* Header */}
      <div className="border-b border-base-300 flex flex-col items-center justify-center gap-2 p-3 lg:hidden">
        <Users />
      </div>

      <div className="border-b border-base-300 flex-col justify-center gap-2 p-3 hidden lg:flex">
        <div className="flex items-center gap-2">
          <Users />
          <h1>Contacts</h1>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-2xl border-2 border-gray-400"
          />
          <h1 className="text-sm font-light">Show online only</h1>
          <p className="text-sm font-light">({onlineUsers.length} online)</p>
        </div>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden block overflow-y-auto">
        {users.map((user, index) => (
          <div
            onClick={() => setSelectedUser(user._id)}
            key={index}
            className={`relative flex justify-center items-center p-2 border-b border-base-300 cursor-pointer ${
              selectedUser === user._id ? "bg-base-300" : ""
            }`}
          >
            <img
              src={user.profilePic || "/avatar (1).png"}
              className="w-12 h-12 rounded-full object-cover"
              alt={user.fullName}
            />
            {onlineUsers.includes(user._id) && (
              <span className="absolute bottom-1 right-5 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
            )}
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user._id)}
            className={`flex items-center gap-3 p-3 border-b border-base-300 transition hover:bg-base-200 cursor-pointer ${
              selectedUser === user._id ? "bg-base-300" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar (1).png"}
                className="w-12 h-12 rounded-full object-cover"
                alt={user.fullName}
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="font-medium truncate">{user.fullName}</h1>
              <p className="text-sm text-zinc-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
