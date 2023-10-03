import { Cart } from "../model/cartSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const AddToCart = async (req, res) => {
  // console.log(req.body);
  // console.log(req.userId);
  try {
    const exist = await Cart.findOne({ id: req.params.id, userId: req.userId });
    // console.log(exist);
    if (exist) {
      res.status(403).json({ message: "Item is already added on your cart" });
    }
    // const cart = req.body.cartData;
    else{
      const cart = {
        ...req.body.cartData,
        userId: req.userId,
      };
      const newUser = new Cart(cart);
      await newUser.save();
      res.status(200).json({ message: cart });
    }
  } 
  catch (error) {
    console.log("error we are getting in add to cart",error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ id: req.params.id, userId: req.userId });
    res.status(200).json({ msg: "product successfully deleted from cart" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllCart = async (req, res) => {
  try {
    let allCart = await Cart.find({ userId: req.userId });
    res.status(200).json(allCart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// export const isLogin = (req,res,next) =>{
//     var Login = req.body.Login;
//     // console.log("middleware is called ");
//     if(Login !== ''){
//         console.log("Login",Login);
//         next();
//     }
//     else{
//         // alert("Login to Continue");
//         // res.redirect(`${process.env.CLIENT_URL}`);
//         res.status(201).json({msg : "Login to continue"});
//     }
// }
