import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

export const Component = styled(Box)`
    height: 85vh;
    width: 55vh;
    padding: 0;
    padding-top: 0;
`;

export const Wrapper = styled(Box)`
    padding: 0px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    box-shadow: 0 0px 44px 0 rgb(0 0 0 / 20%);
    width : 70%;
    margin: auto;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

export const LoginButton = styled(Button)`
  && {
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;

    &:hover {
      background: #484cb5; // Set your desired hover background color
      color: white; // Set your desired hover text color
    }
  }
`;

export const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #00004d;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

export const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
    margin-bottom: 25px;
`;

export const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #b3b3ff;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

export const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
