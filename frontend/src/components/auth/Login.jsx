import React from "react";
import Navbar from "../navbar";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Navigate, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth">
        <Navbar />
        <div className="content">
          <Box className="form">
            <h2>Login</h2>
            <div className="field">
              <TextField id="filled-basic" label="Username" variant="filled" />
            </div>
            <div className="field">
              <TextField id="filled-basic" label="Password" variant="filled" />
            </div>
            <div className="btn" type="button">
              Login
            </div>
            <p>
              Do You want to Create an accout ?
              <span
                onClick={() => {
                  navigate("/signup");
                }}>
                SignUp
              </span>
            </p>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Login;
