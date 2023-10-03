//Libraries
import { Badge, Box, Button, Typography,styled } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useState } from "react";

//components
import LoginDialog from "../login/loginDialog";
import { LoginContext } from "../../context/dataProvider";
import Profile from "./profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    '& > *': {
        marginRight: '40px !important',
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10
        }
    },
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    marginLeft : 5,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    background : "white",
    color : 'blue',
    '&:hover': {
        color: "white",
     },
    [theme.breakpoints.down('md')]: {
        background: '#2874f0',
        color: '#FFFFFF',
        '&:hover':{
            background: '#FFFFFF',
            color:'#2874f0'
        },
    }
}));

const CustomButtons = () =>{
    const [open,setOpen] = useState(false);
    const {Login,setLogin} = useContext(LoginContext);

    const {cartItems } = useSelector(state => state.cart);

    const handleOpen = () =>{
        setOpen(true);
    }

    return(
        < Wrapper>
        {
            Login?<Profile account = {Login} setAccount={setLogin}/>
            :
            <LoginButton variant="contained" onClick={handleOpen} >Login</LoginButton>
        }
            <Typography style={{marginTop:3}}>More</Typography>
            <Container to = "/about"style={{
                marginTop:2,
                fontSize : "16px"
            }}>About</Container>
            <Container to="/cart">
            {cartItems && cartItems.length > 0 && (<Badge badgeContent={cartItems.length} color="primary"> 
            <ShoppingCartIcon/>
            </Badge>
            )}
                <Typography style={{marginLeft: 10}}>Cart</Typography>
            </Container>
            <LoginDialog
                open = {open}
                setOpen = {setOpen}
            />
        </ Wrapper>
    )
}

export default CustomButtons;