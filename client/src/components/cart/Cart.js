//importing libraries
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid, styled } from '@mui/material';
import axios from 'axios';


//importing components
import { getCartProducts, removeFromCart } from '../../redux/actions/cartAction';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { url } from '../../constants/data';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;


const Cart = () => {
    const cartDetails = useSelector(state => state.cart);

    const { cartItems } = cartDetails;
    // const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getCartProducts(navigate));
    },[dispatch,navigate])

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const buyNow = async (amount) => {
        try{
            const {data:{key}} = await axios.get(`${url}/getkey`,{withCredentials:true});
            let {data:{order}} = await axios.post(`${url}/checkout`,{
                amount
            });
    
            var options = {
                key,
                amount: order.amount, 
                currency: "INR",
                name: "Pradip",
                description: "You are paying to pradip ram",
                image: "https://tinyurl.com/yc6s94z8",
                order_id: order.id,
                handler:function(response){
                    // console.log(response);
                    // console.log(cartItems);
                    Object.keys(cartItems).forEach(key => {
                        const element = cartItems[key];
                        // console.log(element.id);
                        dispatch(removeFromCart(element.id));
                    });                      
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
            alert("Something went Wrong.Please Try again after some time");
            console.log("error in place order",err);
        }
    }

    return (
        <>
        {cartItems &&  cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} 
                                removeItemFromCart={removeItemFromCart}
                                />
                            ))
                        }

                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} buyNow = {buyNow} />
                </Grid>
            </Component> 
            : 
            <EmptyCart />
        }
        </>

    )
}

export default Cart;