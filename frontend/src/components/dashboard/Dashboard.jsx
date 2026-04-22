import React from "react";
import Navbar from "../navbar";
import "./dashboard.css";
import DataSaverOnOutlinedIcon from "@mui/icons-material/DataSaverOnOutlined";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1d1a1acb",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "transparent",
    color: "#ffff",
  }),
}));
function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="Dashboard">
      <Navbar />
      <div className="main">
        <div className="Nav">
          <div className="nav">
            <div
              className="profile"
              onClick={() => {
                navigate("/profile");
              }}>
              <div className="profile-icon"></div>
              <div className="username">Profile</div>
            </div>
            <div className="options">
              <div
                className="Option"
                onClick={() => {
                  navigate("/RepoForm");
                }}>
                <DataSaverOnOutlinedIcon />
                <p>New Repository</p>
              </div>
              {/* <div className="Option">
                  <PriorityHighRoundedIcon />
                </div> */}
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="Grid">
            <Grid container spacing={2}>
              <Grid size={3}></Grid>
              <Grid size={6}></Grid>
              <Grid size={3}></Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
