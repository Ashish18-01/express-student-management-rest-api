const sendResponse=require("../utils/response");
const login=(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return sendResponse(
            res,
            400,
            false,
            "Email and Password are required"
        );
    }

    sendResponse(
        res,
        200,
        true,
        "login Successful",
        {
            email,
            token:"JWT_TOKEN_DEMO_123456"

        }
    );
};

const profile=(req,res)=>{
    sendResponse(
        res,
        200,
        true,
        "profile Details",
        {
            id:1,
            name:"Ashish",
            role:"software Engineer"
        }
    );
};

module.exports={
    login,profile
};