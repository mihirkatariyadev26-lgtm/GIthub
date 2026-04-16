import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-out">
        <div className="navbar">
          <div
            className="Logo"
            onClick={() => {
              navigate("/");
            }}>
            <div className="logo"></div>
            <div className="Name">ARBOR</div>
          </div>
          <div className="option-group">
            <div
              className="option"
              onClick={() => {
                navigate("/auth");
              }}>
              Login
            </div>
            <div
              className="option"
              onClick={() => {
                navigate("/signup");
              }}>
              SignUp
            </div>
            <div className="option ">Get Started</div>
            <div className="option"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
