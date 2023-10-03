import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const { isEmail } = validator;

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter firstname"],
    trim: true,
    min: 5,
    max: 20,
  },
  lastname: {
    type: String,
    required: [true, "Please enter lastname"],
    trim: true,
    min: 5,
    max: 20,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter an valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  phone: {
    type: String,
    unique : true,
    required: [true, "Please enter phone number"],
    minlength: [10, "Phone number should be of 10 digit Number"],
    maxlength: [10, "Phone number should be of 10 digit Number"],
  },
});

//fire a function after a doc saved to db
// userSchema.post("save", function (doc, next) {
//   console.log("new user was created & saved ", doc);
//   next();
// });

//fire a function before a doc saved to db
userSchema.pre("save",async function (next) {
//   console.log("user is going to be created and saved ", this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
  next();
});

userSchema.statics.login = async function(userId,password){
  const user = await this.findOne({
    $or: [{ email: userId }, { phone: userId }]
  })
  if(user){
    const auth = await bcrypt.compare(password,user.password);
    if(auth){
      return user;
    }
    throw Error("Invalid email or password");
  }
  throw Error("Invalid email or password");
}

const user = mongoose.model("user", userSchema);

export default user;
