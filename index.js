//Libraries
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
// import { fileURLToPath } from "url";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.resolve();
// import { v4 as uuid } from 'uuid';

//razorpay
import Razorpay from "razorpay";

//Components
import Connection from "./database/db.js";
// import DefaultData from "./default.js";
import router from "./routes/route.js";

// const corsOptions = {
//   // origin: 'http://localhost:3000', // Frontend URL
//   credentials: true, // Enable cookies and CORS for credentials
// };

dotenv.config();
const app = express();
app.use(cookieParser());
// app.use(requireAuth);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors(corsOptions));

// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname,'./client/build')));
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/", router);

// app.get("*",function(req,res){
//   res.sendFile(path.dirname("./client/build/index.html"));
// })
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//cookie
// app.get('/set-cookie',(req,res)=>{
//   res.cookie('hello this is testing',true,{maxAge:1000*60*60*24});
//   res.send("hello you are learning cookie");
// });

// app.get('/read-cookie',(req,res)=>{
//   const cookie = req.cookies;
//   res.json(cookie);
// });

//Razorpay stuff
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// export const setCookie = (token,res) =>{
//   res.cookie('jwt', 'pradip');
// }
//creating server and connectiong it to database
const PORT = process.env.PORT;
Connection();
app.listen(PORT, () =>
  console.log(`server is running successfully on PORT ${PORT}`)
);
// DefaultData();
