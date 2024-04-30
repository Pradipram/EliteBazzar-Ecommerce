//Libraries
import { Dialog, TextField, Typography} from "@mui/material";
import { useContext, useEffect, useState,useCallback } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Key from "@mui/icons-material/Key";
import SmartphoneIcon from '@mui/icons-material/Smartphone';

//components
import logoWhite from "../../images/logoWhite.png"
import { authenticateSignup,authenticateLogin, getUserApi } from "../../service/api";
import { LoginContext } from "../../context/dataProvider";
import "./loginDialog.css";
import { Component, CreateAccount, Error, LoginButton, SignUpButton, Text, Wrapper } from "./loginStyle";

const signupInitialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
};

const loginInitialValues = {
    username: '',
    password: ''
};

const errors = {
    firstnameError: '',
    lastnameError : '',
    emailError :'',
    passwordError :'',
    phoneError :''
};

const LoginDialog = ({open,setOpen}) => {
    
    const [account,setAccount] = useState('login');
    const [signup,setSignup] = useState(signupInitialValues);
    const [login,togleLogin] = useState(loginInitialValues);
    const [error,setError] = useState(false);
    const [visible,setVisible] = useState(false);

    const {setLogin,setIsMerchant,setUserDetails} = useContext(LoginContext);
    // const [firstNameError,setFirstNameError] = useState("");
    const [signUpError,setSignUpError] = useState(errors);

    const getUser = useCallback(async () => {
        try {
            const res = await getUserApi();
            // console.log("res in getUser is ", res);
            if(res.data){
                const isMerchant = res.data.isMerchant;
                // console.log("isMerchant,loginDialog.js",60,isMerchant);
                setIsMerchant(isMerchant);
                setLogin(res.data.firstname);
                setUserDetails(res.data);
            }
        } catch (err) {
            console.log(err);
            setLogin("");
        }
    }, [setLogin,setIsMerchant,setUserDetails]); // Empty dependency array because getUser doesn't depend on any props or state
    
    useEffect(()=>{
        getUser();
    },[getUser]);

    const handleClose = () =>{
        setOpen(false);
        setAccount('login');
        setError(false);
    }

    const togleAccount = () =>{
        var temp = account === 'login'? 'signup ' : 'login';
        setAccount(temp);
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const onValueChange = (e) => {
        togleLogin({ ...login, [e.target.name]: e.target.value });
    }

    const signupUser = async() => {
        setSignUpError(errors);
        try{
            let response = await authenticateSignup(signup);
            // console.log(response.data.user);
            // console.log(response);
            const statusCode = response.status;
            console.log(statusCode);
            if(statusCode === 400){
                let finalError = {
                    firstnameError: response.data.errors.firstname,
                    lastnameError: response.data.errors.lastname,
                    emailError:response.data.errors.email,
                    passwordError:response.data.errors.password,
                    phoneError:response.data.errors.phone
                }
                setSignUpError(finalError);
            }
            else{
                setIsMerchant(response.data.isMerchant);
                setLogin(signup.firstname);
                handleClose();
                setUserDetails(response.data);
                window.location.reload();
                // const data = response.data.user
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        setLogin(false);
        // console.log(response);
        const statusCode = response.status;
        if(statusCode === 400){
            setError(true);
        }
        else {
            // showError(false);
            setError(false);
            handleClose();
            setIsMerchant(response.data.isMerchant);
            setLogin(response.data.firstname);
            setUserDetails(response.data);
            window.location.reload();
            // if(isMerchant){
            //     navigate("/");
            // }
        }
    }

    return (
        <Dialog open = {open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }} >
            <Component>
                <img src={logoWhite} alt="EliteBazaar"
                style={
                    {
                        height: 37,
                        width: "50%",
                        margin: "10px 25%"
                    }
                }
                />
                {
                    account === 'login' ?
                        <Wrapper>
                            <Typography variant="h4" style={{margin: "auto", marginTop : 15}}>Login</Typography>
                            <Typography>Email or Mobile phone number</Typography>
                            <TextField placeholder="Enter Email or mobile phone number" size="small" 
                            onChange={(e) => onValueChange(e)} name="username"
                            InputProps={{
                                startAdornment:(
                                    <PersonIcon/>
                                )
                            }}
                            />
                            <Typography>Password</Typography>
                            <TextField placeholder="Enter Password" size="small" onChange={(e) => onValueChange(e)} name="password" type={visible?'input':'password'} InputProps={{
                                startAdornment:(
                                    <Key/>
                                ),
                                endAdornment:(
                                    visible?
                                    <VisibilityOffIcon sx={{cursor:'pointer',opacity:'0.6'}} onClick={()=>setVisible(!visible)} onMouseOver={(e) => (e.currentTarget.style.opacity = 1)} onMouseOut={(e) => (e.currentTarget.style.opacity = 0.6)}/>
                                    :
                                    <VisibilityIcon sx={{cursor:'pointer',opacity:'0.6'}} onClick={()=>setVisible(!visible)} onMouseOver={(e) => (e.currentTarget.style.opacity = 1)} onMouseOut={(e) => (e.currentTarget.style.opacity = 0.6)}/>
                                )
                            }}
                            />
                            {error && <Error>Please Enter Correct Username or Password</Error>}
                            <LoginButton onClick={()=>loginUser()}>login</LoginButton>
                            <CreateAccount>New to EliteBazaar</CreateAccount>
                            <SignUpButton onClick={togleAccount}>I am a new customer</SignUpButton>
                            <Text>By signing in you are agreeing to our condition of Use and Sale and our Privacy Policy</Text>
                        </Wrapper>
                    : 
                    <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' 
                                InputProps={{
                                    startAdornment:(
                                        <PersonIcon/>
                                    )
                                }}
                            />

                            <div className="error">{signUpError.firstnameError}</div>

                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' 
                                InputProps={{
                                    startAdornment:(
                                        <PersonIcon/>
                                    )
                                }}
                            />

                            <div className="error">{signUpError.lastnameError}</div>

                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' 
                                InputProps={{
                                    startAdornment:(
                                        <EmailIcon/>
                                    )
                                }}
                            />

                            <div className="error">{signUpError.emailError}</div>

                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' 
                                InputProps={{
                                    startAdornment:(
                                        <SmartphoneIcon/>
                                    )
                                }}
                            />

                            <div className="error">{signUpError.phoneError}</div>

                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' type={visible?'input':'password'} InputProps={{
                                startAdornment:(
                                    <Key/>
                                ),
                                endAdornment:(
                                    visible?
                                    <VisibilityOffIcon sx={{cursor:'pointer',opacity:'0.6'}} onClick={()=>setVisible(!visible)} onMouseOver={(e) => (e.currentTarget.style.opacity = 1)} onMouseOut={(e) => (e.currentTarget.style.opacity = 0.6)}/>
                                    :
                                    <VisibilityIcon sx={{cursor:'pointer',opacity:'0.6'}} onClick={()=>setVisible(!visible)} onMouseOver={(e) => (e.currentTarget.style.opacity = 1)} onMouseOut={(e) => (e.currentTarget.style.opacity = 0.6)}/>
                                )
                            }}/>

                            <div className="error">{signUpError.passwordError}</div>

                        <LoginButton onClick={()=>signupUser()}>Create Accouont</LoginButton>
                        <Typography color="primary"
                        style={
                            {
                                cursor : "pointer",
                                marginBottom : 10
                            }
                        }
                        onClick = {togleAccount}
                        >Already Have an account? Sing in</Typography>
                    </Wrapper>
                }
            </Component>
        </Dialog>
    )
}

export default LoginDialog;