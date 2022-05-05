import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignUp(props) {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleClose = () => {
    props.setOpenSignUp(false);
  };

  const handleCloseandOpenSignUp = () => {
    handleClose();
    props.setOpenLogIn(true);
  };

  function handleFirstNameChange(event) {
    console.log(event.target.value);
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    console.log(event.target.value);
    setLastName(event.target.value);
  }

  function handleEmailChange(event) {
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    console.log(event.target.value);
    setConfirmPassword(event.target.value);
  }

  async function signupUser(loginDetails) {
    const url = "http://127.0.0.1:8000/api/accounts/signup/";
    const data = JSON.stringify(loginDetails);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, data, config);

    if (response.status === 201) {
      console.log(response.data);
    } else {
      alert("signup failed");
    }
  }

  function handleSubmit(event) {
    console.log(event);
    if (confirmPassword !== password) {
      alert("passwords do not match");
    } else {
      const loginDetails = { first_name, last_name, email, password };
      signupUser(loginDetails);
      handleClose();
    }
  }

  return (
    <Dialog
      open={props.openSignUp}
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
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5">Sign up now to start buying!</Typography>

            <Box
              component="form"
              sx={{
                width: 1, // Fix IE 11 issue.
                mt: 3,
              }}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleFirstNameChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleLastNameChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleEmailChange}
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
                    onChange={handlePasswordChange}
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
                    onChange={handleConfirmPasswordChange}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mx: 0, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    variant="body2"
                    underline="hover"
                    onClick={handleCloseandOpenSignUp}
                    style={{ cursor: "pointer" }}
                  >
                    Already have an account? Log in...
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
