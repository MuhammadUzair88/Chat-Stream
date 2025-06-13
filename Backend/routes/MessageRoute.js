const express = require("express");
const protectedRoutes=require("../middlewares/ProtectedRoutes") ;
const { getUsersForSidebar, getMessages, sendMessages } = require("../controllers/Message");


const router = express.Router();

router.get("/users", protectedRoutes, getUsersForSidebar);
router.get("/:id", protectedRoutes, getMessages);

router.post("/send/:id", protectedRoutes, sendMessages);

module.exports = router;