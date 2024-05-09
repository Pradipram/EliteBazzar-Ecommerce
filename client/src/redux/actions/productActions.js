import * as actionTypes from "../constants/productConstants";
//Libraries
import axios from "axios";

//components
// import { url } from '../../constants/data';
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from "../constants/productConstants";
// import { errorMonitor } from "formidable/Formidable";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products`);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/product/${id}`);

    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: error.response,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};

export const addProduct = (item, toast, handleModalClose) => async (dispatch) => {
  try {
    // console.log("item is ",item);
    const res = await axios.post("/addProduct", item, {
      withCredentials: true,
    });
    console.log("ProductAction,42", res);
    if (res.status === 200) {
      dispatch({ type: actionTypes.ADD_ITEM, payload: item });
      toast.success("Item added successfully");
      handleModalClose();
    } else {
      dispatch({
        type: actionTypes.ADD_ITEM_FAIL,
        payload: "something went wrong",
      });
      toast.error("Either Productcode of title already exist");
    }
  } catch (err) {
    console.log("error",err);
    // dispatch({ type: actionTypes.ADD_ITEM_FAIL, payload: err.response });
    // toast.error("something went wrong");
    if(err.response.status === 403){
      dispatch({type: actionTypes.ADD_ITEM_FAIL,payload: err.response.data.message});
      toast.error(err.response.data.message);
    }
    else if(err.response.status === 413){
      dispatch({type: actionTypes.ADD_ITEM_FAIL, payload: "Image is too large"});
      toast.error("Image is too large");      
    }
    else{
      dispatch({type: actionTypes.ADD_ITEM_FAIL, payload: "something went wrong"});
      toast.error("Something went wrong. Please try again lator!");
    }
  }
};
