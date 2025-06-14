# 💬 Chat Stream

**Chat Stream** is a full-stack real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for real-time communication. It supports text and image messaging, online user status updates, dynamic theming with **DaisyUI**, and profile customization.

## 🌟 Features

- 🔐 User authentication (Login & Signup)
- 📡 Real-time messaging via **WebSockets**
- 🟢 Live user online/offline indicators
- 💬 Text and image message support
- 🎨 35+ dynamic themes with **DaisyUI**
- 👤 Profile image upload and update
- 📱 Mobile responsive design

## 🚀 Tech Stack

| Technology     | Purpose                           |
|----------------|-----------------------------------|
| MongoDB        | NoSQL Database                    |
| Express.js     | Backend Framework                 |
| React.js       | Frontend UI Library               |
| Node.js        | JavaScript Runtime                |
| Socket.IO      | Real-time WebSocket Communication |
| Cloudinary     | Image Upload and Hosting          |
| DaisyUI        | Tailwind-based UI Themes          |

## 🔧 Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd Backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

env
Copy
Edit
PORT=5000
MONGO_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run the server:

bash
Copy
Edit
npm start
Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file if needed for frontend configuration.

Run the development server:

bash
Copy
Edit
npm run dev
📁 Project Structure
bash
Copy
Edit

Chat-Stream/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── .env


💡 Future Improvements
✅ Emoji picker support

✅ Theme persistence

🕓 Message read receipts

📎 File/document sharing

📞 Voice/video calling integration

🧑‍💻 Author
Built with 💙 by Muhammad Uzair
