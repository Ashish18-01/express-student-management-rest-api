const validateStudent=(req,res,next)=>{
    const{name,age,course}=req.body;

    if(!name || !age || !course){
        return res.status(400).json({
            success:false,
            message:"Name,age and course are required,"

        });
    }
    next();
};

module.exports=validateStudent;