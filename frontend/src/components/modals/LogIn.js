import * as React from "react";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // login states
  const [email, setLoginEmail] = useState();
  const [password, setLoginPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function handleLoginEmail(event) {
    console.log(event.target.value);
    setLoginEmail(event.target.value);
  }

  function handleLoginPassword(event) {
    console.log(event.target.value);
    setLoginPassword(event.target.value);
  }

  function handleConfirmPassword(event) {
    console.log(event.target.value);
    setConfirmPassword(event.target.value);
  }

  const handleClose = () => {
    props.setOpenLogIn(false);
  };

  function handleLoginClick(event) {
    // check if password = confirmPassword
    if (confirmPassword !== password) {
      alert("passwords do not match");
    } else {
      const loginDetails = { email, password };
      loginUser(loginDetails);
      handleClose();
    }
  }

  return (
    <Dialog
      open={props.openLogIn}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
              }}
            >
              <LockOpenOutlinedIcon />
            </Avatar>

            <Typography variant="h5">Login</Typography>

            <Box
              component="form"
              sx={{
                width: 1, // Fix IE 11 issue.
                mt: 3,
              }}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleLoginEmail}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password (min x characters)"
                    type="password"
                    id="password"
                    onChange={handleLoginPassword}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    onChange={handleConfirmPassword}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mx: 0, mb: 2 }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
