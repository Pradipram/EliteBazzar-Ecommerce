import * as actionTypes from '../constants/productConstants';
//Libraries
import axios from 'axios';

//components
import { url } from '../../constants/data';
import { GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAIL } from '../constants/productConstants';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/products`);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${url}/product/${id}`);
        
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});

    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};