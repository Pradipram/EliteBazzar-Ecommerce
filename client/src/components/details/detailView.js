//Libraries
import { useEffect, useState } from 'react';
import { styled, Box, Typography, Grid, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from "axios";

//Components
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { getProductDetails } from '../../redux/actions/productActions';
import { url } from "../../constants/data";
import ReviewComponents from '../review/reviewComponents';

const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {
    const [review,setReview] = useState();
    const [star,setStar] = useState();
    const { id } = useParams();
    const { loading, product } = useSelector(state => state.getProductDetails);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(product && id !== product.id)   
            dispatch(getProductDetails(id));
    }, [dispatch, product, id, loading]);

    useEffect(()=>{
        const getReview = async()=>{
            try{
                const res = await axios.get(`${url}/review/${id}`);
                // console.log("result from Review is ",res);
                setReview(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getReview();
        let star = 0;
        if(review && review.length>0){
            review.map((reviewItem)=>(
                star = star + reviewItem.rating
            ));
            star = star/review.length;
            setStar(star);
            console.log("star we are getting is ",star);
        }
        else{
            setStar("No rating");
        }
    },[id,review])

    return (
        <div>
            <Component>
                { product && Object.keys(product).length &&
                    <Container container> 
                        <Grid item lg={4} md={4} sm={8} xs={12} style={{margin:"auto"}}>
                            <ActionItem product={product} />
                        </Grid>
                        <RightContainer item lg={8} md={8} sm={8} xs={12} style={{margin: "auto",padding: 20}}>
                            <h2 style={{marginBottom: 0,color:'#363434'}}>{product.title}</h2>
                            <div style={{marginTop: 5, color: '#878787', fontSize: 14,display:"flex",alignItems:"center" }}>
                                {
                                    review && review.length > 0 ?
                                    <>  
                                        <span>{parseFloat(star).toFixed(1)}</span>
                                        <Rating value={star} readOnly precision={0.1}/>
                                        <span>rated by {review.length} user</span>
                                    </>
                                    :
                                    <>
                                        <span>No Rating</span>
                                    </>
                                }
                            </div><hr/>
                            <Typography>
                                <Box>
                                    <span style={{ color: '#388E3C' }}>-{product.discount} off</span>
                                    <span style={{ fontSize: 28 }}>₹{(product.price - (product.price * product.discount)/100).toFixed(2)}</span>&nbsp;&nbsp;&nbsp; 
                                </Box>
                                <Box>
                                    <span style={{ color: '#878787' }}>M.R.P.:-<strike> ₹{product.price}</strike></span>&nbsp;
                                    Inclusive of all taxes
                                </Box>
                            </Typography><hr/>
                            <ProductDetail product={product} />
                        </RightContainer>
                    </Container>
                }   
            </Component>
            <hr/>
            <>
                {review && review.length > 0 ?
                    <div>
                        {
                            review.map((reviewItem) =>(
                                <ReviewComponents data={reviewItem}/>
                            ))
                        }
                        {/* Review and rating will come here. */}
                    </div>
                    :
                    <div style={{textAlign:"center"}}>
                        <h2>No Review</h2>
                    </div>
            
                }
            </>
        </div>
    )
}

export default DetailView;