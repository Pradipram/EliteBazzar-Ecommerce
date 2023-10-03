import {AppBar,Box,Toolbar,styled,IconButton, Drawer,List} from "@mui/material"
import logo from "../../images/logo.jpg"
import Search from "./search";
import CustomButtons from "./CustomButtons";
import { Link } from "react-router-dom";
import { Menu } from '@mui/icons-material';
import { useState } from "react";

const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
`;

const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    color: #FFFFFF;
    text-decoration: none;
`;

const CustomButtonWrapper = styled(Box)(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

const Header = () => {
    const [open,setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
    };
    
    const handleClose = () =>{
        setOpen(false);
    }

    if (!window ||!document){
        return null;
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );

    return (
        <StyledHeader>
            <Toolbar>
                <MenuButton color="inherit" onClick={handleOpen}>
                    <Menu/>
                </MenuButton>

                <Drawer open = {open} onClose={handleClose}>
                    {list()}
                </Drawer>

                <Component to={'/'} >
                    <img src={logo} alt="logo" style={{width: 170}}/>
                </Component>
                <Search/>
                <CustomButtonWrapper>
                    <CustomButtons/>
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;