const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");

async function authMiddleware(req,res,next){
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await userModel.findById(decoded.id);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports=authMiddleware;