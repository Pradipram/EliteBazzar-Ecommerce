import express from  'express';
import { addProduct, getProductById, getProducts } from '../controller/product-controller.js';
import {jwtSignUp, jwtSignIn, logoutUser, getUser, getUserById } from '../controller/user-controller.js';
import { checkout, paymentVerification } from '../controller/razorpayController.js';
import { AddToCart, getAllCart, removeFromCart } from '../controller/cart-controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { AddReview, getReveiw } from '../controller/reviewController.js';
import { isMerchant } from '../middleware/merchantMidleware.js';

const router = express.Router();


router.post('/signup',jwtSignUp);
router.post('/login',jwtSignIn);
router.get('/logout',logoutUser);
router.get('/getuser',getUser);
router.get('/getuser/:id',getUserById);


//related to product
router.get('/products', getProducts);
router.get('/product/:id',getProductById);
router.post('/addProduct',requireAuth,isMerchant,addProduct);

//related to cart
router.get('/cart',requireAuth,getAllCart);
router.post('/cart/:id',requireAuth,AddToCart);
router.delete('/cart/:id',requireAuth,removeFromCart);
router.post('/checkout',checkout);

router.post('/paymentverification',requireAuth,paymentVerification);
router.get('/getkey',requireAuth,(req,res) =>{
    res.status(200).json({key : process.env.RAZORPAY_API_KEY})
});
router.post('/review',requireAuth,AddReview);
router.get('/review/:id',getReveiw);
export default router;