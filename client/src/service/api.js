import axios from 'axios';

// import { url } from '../constants/data';

export const authenticateLogin = async (user) => {
    try {
        const res =  await axios.post(`/login`, user,{
            withCredentials:true
        })
        // console.log("in api authenicateLogin res is ",res);
        return res;
    } catch (error) {
        return error.response;
    }
}

export const authenticateSignup = async (user) => {
    try {
        const res =  await axios.post(`/signup`, user,{withCredentials:true});
        // console.log("in api.authenticateSignup res is ",res);
        return res;
    } catch (err) {
        // console.log('Error while calling Signup API: ', error);
        return err.response;
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}


export const logoutApi = async ()=>{
    try{
        const res = await axios.get(`/logout`,{withCredentials:true});
        console.log("we are getting res from backend is ",res);
        return res;
    }
    catch(err){
        // console.log("getting error in logout ",err);
        return err;
    }
}

export const getUserApi = async ()=>{
    try{
        const res = await axios.get(`/getuser`,{withCredentials:true});
        // console.log("res in getUser api is ",res);
        return res;
    }
    catch(error){
        // console.log(error);
        // console.log(error);
        return error;
    }
};