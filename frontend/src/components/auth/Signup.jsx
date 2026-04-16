import React from "react";
import Navbar from "../navbar";
import "./Login.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
function Signup() {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth">
        <Navbar />
        <div className="content">
          <Box className="form">
            <h2>SignUp</h2>
            <div className="field">
              <TextField
                id="filled-basic"
                label="Email"
                type="email"
                variant="filled"
              />
            </div>
            <div className="field">
              <TextField id="filled-basic" label="Username" variant="filled" />
            </div>
            <div className="field">
              <TextField id="filled-basic" label="Password" variant="filled" />
            </div>
            <div className="btn" type="button">
              SignUP
            </div>
            <p>
              Already have an accout ?
              <span
                onClick={() => {
                  navigate("/auth");
                }}>
                Login
              </span>
            </p>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Signup;
