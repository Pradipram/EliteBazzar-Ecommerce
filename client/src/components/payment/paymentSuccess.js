// importing libraries
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

// importing componenets
import "./Payment.css";
import { getProductById } from "../../service/api";
import { Button, Rating, TextField } from "@mui/material";
import axios from "axios";
import { url } from "../../constants/data";

const PaymentSuccess = () => {
  const [product, setProduct] = useState();
  const [star,setStar] = useState(0);
  const [headline,setHeadline] = useState("");
  const [review,setReview] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        // console.log("product is ", res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);

  const onSubmit = async()=>{
    try{
      const res = await axios.post(`${url}/review`,{"productId":id,"rating":star,"headline":headline,"review":review},{withCredentials:true});
      console.log("res after submitting review is ",res);
      if(res.status === 201){
        alert("Thank you for giving feedback");
        navigate("/");
      }
      
    }
    catch(err){
      // console.log(err);
      if(err.response && err.response.status === 403){
          alert(err.response.data.msg);
          navigate("/");
      }
      else{
        alert("Something went wrong");
      }
    }
  }

  return (
    <div className="imageContainer">
      {product ? (
        <div className="image">
          <img src={product.detailUrl} alt="not found" />
          <h3>{product.title.longTitle}</h3>
          <p>{product.description}</p>
        </div>
      ) : (
        <div>Something went Wrong</div>
      )}
      {/* <div className="verticalLine"></div> */}
      <div className="comment">
        <h1>Give FeedBack</h1>
        <hr className="horizontal"/>
        <h2>Overall rating</h2>
        <Rating
            name="half-rating"
            // value={3.7}
            // precision={0.1}
            size="large"
            onChange={(event,newValue)=>{
                // console.log("new value from star is : ",newValue);
                setStar(newValue);
            }}
        />
        <hr className="horizontal"/>
        <h2>Add a headline</h2>

            <TextField size="small" style={{width:"60%"}} placeholder="What's most important to know"
                onChange={(e)=>{
                    // console.log("on change",e.target.value);
                    setHeadline(e.target.value);
                    // console.log("headline is ",headline);
                }}
            />

        <hr className="horizontal"/>
        <h2>Add a written review</h2>

        <TextField style={{width:"60%"}} multiline minRows={5} placeholder="What did you like or dislike? What did you use this product for?"
            onChange={(e)=>{
                setReview(e.target.value);
            }}
        />

        <hr className="horizontal"/>   
        <Button className="Submit" variant="contained" onClick={onSubmit}>Submit</Button>
        <Button style={{backgroundColor : "#f5b042",margin : "10px"}} onClick={()=>{navigate("/");}} variant="contained">Skip</Button>

      </div>
    </div>
  );
};

export default PaymentSuccess;
