//Libraries 
import axios from 'axios';
import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';

//components
import { addToCart } from '../../redux/actions/cartAction';
import { useDispatch } from 'react-redux';
import { url } from '../../constants/data';
// import { LoginContext } from '../../context/dataProvider';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    // padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
        
    const dispatch = useDispatch();

    // const {Login} = useContext(LoginContext);

    const buyNow = async () => {
        try{
            const {data:{key}} = await axios.get(`${url}/getkey`,{
                withCredentials:true
            })
    
            let {data:{order}} = await axios.post(`${url}/checkout`,{
                amount : product.price.cost 
            });
            var options = {
                key,
                amount: order.amount, 
                currency: "INR",
                name: "Pradip",
                description: "You are paying to pradip ram",
                image: "https://tinyurl.com/yc6s94z8",
                order_id: order.id, 
                // callback_url: `${url}/paymentverification`,
                handler : function(response){
                    console.log("i dont know what is goint on ",response);
                    navigate(`/paymentSuccess?id=${id}`);
                },
                prefill: {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            var razor = new window.Razorpay(options);
            razor.open();
        }
        catch(err){
            if(err.response.status === 401){
                alert("Please login to continue");
                // navigate("/");
            }
        }
    }

    const addItemToCart = () => {
        dispatch(addToCart(id,navigate));
        // navigate('/cart');
    }

    return (
        <LeftContainer>
            <Image src={product.detailUrl} /><br />
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{background: '#fb641b'}} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;