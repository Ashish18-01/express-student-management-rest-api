const jwt=require("jsonWebtoken");
const generateToken=(userId)=>{
    return jwt.sign(
        {
            id:userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPRESS_IN || "7d"
        }
    );
};

module.exports=generateToken;