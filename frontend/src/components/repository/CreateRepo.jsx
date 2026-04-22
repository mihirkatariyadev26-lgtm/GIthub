import React from "react";
import Navbar from "../Navbar.jsx";
import "./CreateRepo.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));
function CreateRepo() {
  return (
    <div className="Repoform">
      <Navbar />
      <div className="content">
        <Box className="form">
          <h3>Create Repository</h3>
          <div className="field">
            <TextField
              id="filled-basic"
              label="Repository Name"
              variant="filled"
            />
          </div>
          <div className="field">
            <TextField
              id="filled-basic"
              type="password"
              label="Description"
              variant="filled"
            />
          </div>
          <div className="field">
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <label htmlFor="Visibility">Visibility:</label>
              <Typography>Privet</Typography>
              <AntSwitch
                slotProps={{ input: { "aria-label": "ant design" } }}
              />
              <Typography>Public</Typography>
            </Stack>
          </div>

          <div className="btn" type="button">
            Creat Repository
          </div>
        </Box>
      </div>
    </div>
  );
}

export default CreateRepo;
