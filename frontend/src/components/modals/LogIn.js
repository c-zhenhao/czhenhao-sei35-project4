import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  // login states
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginConfirmPassword, setLoginConfirmPassword] = useState();

  function handleLoginEmail(event) {
    console.log(event.target.value);
    setLoginEmail(event.target.value);
  }
  function handleLoginPassword(event) {
    console.log(event.target.value);
    setLoginPassword(event.target.value);
  }
  function handleConfirmLoginPassword(event) {
    console.log(event.target.value);
    setLoginConfirmPassword(event.target.value);
  }

  // redirect back after api call
  const navigate = useNavigate();

  // api call to authenticate

  const handleClose = () => {
    props.setOpenLogIn(false);
  };

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
                    onChange={handleConfirmLoginPassword}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mx: 0, mb: 2 }}
              >
                Login
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    variant="body2"
                    underline="hover"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleClose();
                      alert("please contact the admin... TBD stretch goal");
                    }}
                  >
                    Forgot password?
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
