
const JWT=require('jsonwebtoken');

const protectedRoutes=(req,res,next)=>{

    const authheader=req.headers.authorization;
    if(!authheader){
        return res.status(401).json({message:"Unauthorized access, token is missing"});
    }

    const token=authheader.split(" ")[1];
    
    if(!token){ 
        return res.status(401).json({message:"Unauthorized access, token is missing"});
    }
    try{
        const decodedUser=JWT.verify(token,process.env.JWT_SECRET);
        req.user=decodedUser;
        next();

    }
catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports=protectedRoutes;