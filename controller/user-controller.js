//importing libraries
import jwt from "jsonwebtoken";

import User from "../model/userSchema.js";

const handleError = (err) =>{
    // console.log(err.message,err.code);
    let errors = {email: '',password: '',firstname:'',lastname:'',phone:''};

    if(err.code === 11000 && err.keyPattern.email){
        errors.email = "This email already exist. Please login to continue.";
        return errors;
    }

    if(err.code === 11000 && err.keyPattern.phone){
      errors.phone = "This phone number already exist. Please login to continue";
    }

    if(err.message.includes('user validation failed')){ 
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const SecretKey = process.env.SECRET_KEY;
const maxAge = process.env.MAX_AGE;

const createToken = (id)=>{
  // console.log("maxAge is ",maxAge);
  // console.log("secreteKey ",SecretKey);
  return jwt.sign({id},SecretKey,{
    expiresIn : maxAge*1000
  });
};

export const jwtSignUp = async (req, res) => {
  // console.log(req.body);
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    const token = createToken(newUser._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({user:newUser._id});
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({errors});
  }
};

export const jwtSignIn = async(req,res) =>{
  const {username,password} = req.body;
  // console.log("username : ",username);
  // console.log("password:",password);
  try{
    const user = await User.login(username,password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true,secure:false, maxAge: maxAge * 1000 });
    // setCookie(token,res);
    res.status(200).json({user:user._id,firstname:user.firstname});
  }
  catch(err){
    // console.log(err);
    res.status(400).json({error:err});
  }
};

export const logoutUser = (req,res) =>{
  // console.log(req.body);
  res.cookie('jwt','',{httpOnly:true,secure : false,maxAge : 1});
  res.status(200).json({message : "user signout successfully"});
}

export const getUser = (req,res) =>{
  const token = req.cookies.jwt;
  const secreteKey = process.env.SECRET_KEY;
  if(token){
      jwt.verify(token,secreteKey,async(err,decodedToken)=>{
          if(err){
              console.log("Error in getting user details",err);
              res.status(401).json({message:"not authenicated"});
              // res.redirect("/");
          }
          else{
              const user = await User.findById(decodedToken.id);
              res.status(200).json({firstname : user.firstname});
          }
      })
  }
  else{
      res.status(401).json({message:"not authenticated"});    
      // res.redirect("/");
  }
};

export const getUserById =async(req,res)=>{
  const id=req.params.id;
  try{
    const user = await User.findById(id);
    // console.log(user);
    res.status(200).json(user);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
}