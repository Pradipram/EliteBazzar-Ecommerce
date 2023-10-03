import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../model/paymentModel.js";

export const checkout = async (req, res) => {
  const options = {
    amount : Number(req.body.amount * 100),
    currency: "INR",
  };
  // console.log("options is ",options);
  try{
      const order = await instance.orders.create(options);
      // console.log("order is ",order);
      // res.status(200).json({
      //   success: true,
      //   order,
      // });
      res.status(200).json({
        success:true,
        order
      })
  }
  catch(err){
    console.log("error is : ",err);
    res.status(500).json({message:err.message});
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    
    // res.redirect(
    //   `${process.env.CLIENT_URL}/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    res.status(200).json({message :" you paid successfully"});
  } else {
    res.status(400).json({
      success: false,
    });
  }
};