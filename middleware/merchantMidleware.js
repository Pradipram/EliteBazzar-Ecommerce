import User from "../model/userSchema.js";


export const isMerchant = async(req,res,next) =>{
    try{
        const id = req.userId;
        const user = await User.findById(id);
        // console.log(user);
        if(user.isMerchant){
            next();
        }
        else{
            res.status(401).json({message: "Only merchant can add Product"});
        }
    }
    catch(err){
        res.status(500).json({message: "something went wrong"});
    }
}