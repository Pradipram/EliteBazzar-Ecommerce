import { Review } from "../model/reviewSchema.js";


export const AddReview = async(req,res) =>{
    // console.log("req.body : ",req.body);
    try{
        const exitst = await Review.findOne({userId : req.userId,productId:req.body.productId});
        if(exitst){
            res.status(403).json({msg : "You have already reviewed the product."});
        }
        else{
            const review = {
                ...req.body,
                userId: req.userId,
                date: Date.now()
            }
            const newReview = await new Review(review);
            newReview.save();
            res.status(201).json({msg:review});
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : err});
    }
}

export const getReveiw = async(req,res) =>{
    const id = req.params.id;
    // console.log(id);
    try{
        const review = await Review.find({"productId" : id});
        // console.log(review);
        res.status(200).json(review);
    }
    catch(err){
        // console.log(err);
        res.status(500).json(err);
    }
}