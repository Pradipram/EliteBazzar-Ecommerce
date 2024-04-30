import React, { useContext, useState } from "react";
import { Avatar } from "@mui/material";

import logo from "../../images/logoWhite.png";
import { LoginContext } from "../../context/dataProvider";
import Profile from "./Profile";
import "./Merchant.css"

const MerchantNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { userDetails } = useContext(LoginContext);

  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()}`,
    };
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAvatarClick = () => {
    // console.log("avatar is clicked")
    setDrawerOpen(true);
  };

  return (
    <div className="merchantNavbar">
      <img src={logo} alt="Navbar" height={40} style={{marginTop: 20,marginLeft:20}}/>
      <h1>Dahsboard</h1>
      <div style={{marginTop: 10,marginRight:10}}>
        <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
          <Avatar {...stringAvatar(userDetails.email)} />
        </div>
        <Profile
          open={drawerOpen}
          onClose={handleCloseDrawer}
          stringAvatar={stringAvatar}
          user={userDetails.firstname + userDetails.lastname}
          email={userDetails.email}
        />
      </div>
    </div>
  );
};

export default MerchantNavbar;
