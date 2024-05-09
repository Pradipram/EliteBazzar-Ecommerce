//Libraries
import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Box, Button, Modal } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

///components
import "./Merchant.css";
import { logoutApi } from "../../service/api";
import { LoginContext } from "../../context/dataProvider";
import AddItems from "./AddItems";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


function Profile({
  open,
  onClose,
  stringAvatar,
  user,
  email,
  // setLogin,
}) {

  const [modalOpen,setModalOpen] = useState(false);
  const navigate = useNavigate();
  const {setLogin} = useContext(LoginContext);
  const inputString = user; // Replace this with your string
  const words = inputString.split(" ");
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const handleLogout = async () => {
    const res = await logoutApi();
    // console.log(res);
    if (res) {
      onClose(false);
      setLogin("");
      navigate("/");
      window.location.reload();
    } else {
      alert("Something unepected happened.Please try again");
    }
  };

  const handleModalClose = () =>{
    setModalOpen(false);
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="drawer">
        <div className="profile">
          <Avatar {...stringAvatar(user)} />
          <h1>{formattedString}</h1>
          <h4 style={{ color: "#8c95de" }}>{email}</h4>
        </div>
        {/* <button className='profile-button'>Logout</button> */}
        <Button
          variant="contained"
          style={{ marginTop: 20 }}
          onClick={handleModalOpen}
        >
          ADD Items
        </Button>
        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box sx={{ ...style, minWidth: 200 }}>
          <AddItems handleModalClose = {handleModalClose}/>

          </Box>
        </Modal>
        <Button
          variant="outlined"
          endIcon={<LogoutIcon />}
          style={{ marginTop: 20 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Drawer>
  );
}

export default Profile;
