import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import {
  Typography,
  Container,
  Box,
  Avatar,
  Grid,
  Button,
  TextField,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

export default function ProfileEdit() {
  let { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // profile inputs
  const [first_name, setFirstName] = useState(currentUser.first_name);
  const [last_name, setLastName] = useState(currentUser.last_name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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

  function handleSubmit() {
    // authenticate password
    // then call api to update db
    // route back to profile
    navigate("/profile");
  }

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Edit Profile
        </Typography>

        <Container component="main" maxWidth="lg">
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
                width: 69,
                height: 69,
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>

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
                    placeholder={first_name}
                    defaultValue={first_name}
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
                    placeholder={last_name}
                    defaultValue={last_name}
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
                    placeholder={email}
                    defaultValue={email}
                    onChange={handleEmailChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>please retype your password</Typography>
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
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
}
