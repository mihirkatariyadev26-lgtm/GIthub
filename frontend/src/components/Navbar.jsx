import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Navbar() {
  const navigate = useNavigate();
  const [isLogedin, setIsLogedin] = useState(false);
  useEffect(() => {
    setIsLogedin(!!localStorage.getItem("token"));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogedin(false);
  };
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
            {isLogedin ? (
              <div className="option" onClick={handleLogout}>
                Logout
              </div>
            ) : (
              <>
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
              </>
            )}

            <div className="option ">Get Started</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
