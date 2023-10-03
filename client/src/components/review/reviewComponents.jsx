//importing libraries
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";

//importing components
import { url } from "../../constants/data";
import "./review.css";
import { Rating } from "@mui/material";

const ReviewComponents = ({data}) =>{
    const [firstname,setfirstname] = useState();
    const [lastname,setlastname] = useState();
    const [date,setDate] = useState();
    useEffect(()=>{
        const getUserById = async()=>{
            try{
                const res = await axios.get(`${url}/getuser/${data.userId}`);
                // console.log("we are getting in getUserById is ",res);
                if(res && res.status === 200){
                    setfirstname(res.data.firstname);
                    setlastname(res.data.lastname);
                }
                // console.log("firstname is ",user);
            }
            catch(err){
                console.log(err);
            }
        }
        getUserById();
        const date = new Date(data.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        // console.log("formatted date is ",formattedDate);
        setDate(formattedDate);
        // console.log("data is ",data.rating);
    },[data.userId,data.date])
    return (
        <div className="review">
            <div className="flex">
                <AccountCircleIcon/>
                <h3>{firstname} {lastname}</h3>
            </div>
            <div className="flex">
                <Rating readOnly precision={0.1} value={data.rating} size="small"/>
                <h4 style={{color:"rgba(0, 0, 0, 0.8)"}}>{data.headline}</h4>
            </div>
            <div className="flex">
                <span style={{color:"rgba(0,0,0,0.8)"}}>Reviewed in India on {date}</span>
            </div>
            <p style={{margin : "10px"}}>{data.review}</p>
        </div>
    )
}

export default ReviewComponents;