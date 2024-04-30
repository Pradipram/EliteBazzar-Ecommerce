import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';
import { logoutApi } from '../../service/api';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = async() => {
        // setAccount('');
        // console.log("logout is clicked");
        const res =await logoutApi();
        console.log("res is ",res);
        console.log("res status is ",res.status);
        if(res.status === 200){
            setAccount('');
            navigate('/');
            window.location.reload();
        }
        else{
            alert("something went wrong. Please try again");
        }
    }
    
    return (
        <>
            <Box onClick={handleClick}><Typography style={{ marginTop: 2,marginLeft : 5,cursor : 'pointer' }}>{account}</Typography></Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); logout();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )    
}

export default Profile;