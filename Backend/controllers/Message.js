const cloudinary  = require('../lib/Cloudinary');
const { getReceiverSocketId, io } = require('../lib/socket');
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");

const getUsersForSidebar = async (req, res) => {
  try {
    const LoggedInUserId = req.user.id; // no destructuring

    const FilteredUsers = await User.find({ _id: { $ne: LoggedInUserId } }).select("-password");
    res.status(200).json(FilteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getMessages = async (req, res) => {
  try {
    const UserToChatWithId = req.params.id;
    const myId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: UserToChatWithId },
        { senderId: UserToChatWithId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // optional: sort oldest to newest

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const sendMessages=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user.id;
        let imageUrl;
        if(image){
                  // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

       const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

        res.status(201).json(newMessage);
    }
    catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports={getUsersForSidebar,getMessages,sendMessages}