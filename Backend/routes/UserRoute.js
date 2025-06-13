const express=require('express');
const { SignUp, Login, updateProfile } = require('../controllers/Auth');
const protectedRoutes = require('../middlewares/ProtectedRoutes');

const router=express.Router();

router.post('/signup',SignUp)
router.post('/login',Login)
router.put('/updateprofile',protectedRoutes,updateProfile)

module.exports=router;