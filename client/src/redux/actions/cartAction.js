// import {useNavigate} from "react-router-dom";

import { url } from '../../constants/data';
import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

function transformToCartSchema(data) {
    const discountAmount = (data.price * (data.discount / 100)).toFixed(2); // Calculate discount amount based on percentage
    const cost = data.price - discountAmount;
  
    return {
      id: data.id,
      userId: data.merchantId, 
      url: data.url,
    //   detailUrl: data.url, 
    //   title: {
    //     shortTitle: data.title, 
    //     longTitle: data.title,
    //   },
    title: data.title,
      price: {
        mrp: data.price,
        cost: parseFloat(cost), // Ensure `cost` is a number
        discount: data.discount.toString(),
      },
    };
  }
  
  // Usage example:

export const addToCart = (id,navigate) => async (dispatch) => {
    try { 
        const { data } = await axios.get(`${url}/product/${id}`);
        // console.log("data we are getting is ",data);
        const cartData = transformToCartSchema(data);
        // console.log("cartSchema: ",transformedData);
        // delete data._id;
        let response = await axios.post(`${url}/cart/${id}`,{cartData : cartData},{withCredentials:true});
        // console.log("response getting in addToCart is : ",response);
        if(response.status === 200){
            navigate("/cart");
        }
        
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data } });

    }catch(error) {
        console.log('Error while calling cart API',error);
        if(error.response.status === 401){
            alert("Please Login to continue");
        }
        if(error.response.status === 403){
            alert("This Item is already present in cart..");
            navigate("/cart");
        }
        else{
            alert("Something went wrong please try again");
        }
    }
};

export const removeFromCart = (id) => async(dispatch) => {
    try{
        let response =  await axios.delete(`${url}/cart/${id}`,{withCredentials:true});
        if(response.status === 201){
            alert("Login to continue");
        }
        else{
            dispatch({
                type: actionTypes.REMOVE_FROM_CART,
                payload: id
            })
        }
    }
    catch(error){
        console.log(`Error in removing product ${id} `,error );
    }
};

export const getCartProducts = (navigate) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
        const response = await axios.get(`${url}/cart`,{
            withCredentials:true
        });
        // console.log(response);
        dispatch({ type: actionTypes.GET_CART_SUCCESS, payload: response.data });

    } catch (error) {
        // console.log("getting error while calling getCartProducts",error);
        if(error.response.status === 401){
            alert("Please login to continue");
            navigate("/");
        }
        dispatch({ type: actionTypes.GET_CART_FAILURE, payload: error.response });
    }
};