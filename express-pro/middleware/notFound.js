const notFound=(req,res)=>{
    res.status(400).json({
        success:false,
        message:"Requested Route not found"
    });
};

module.exports=notFound;