import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  Card,
  Button,
  Avatar,
  Grid,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { users } from "../fedata/user";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  function getUserDetails() {
    // api call to get user details

    // for now use static data
    setUser(users[0]);
  }

  useEffect(() => {
    getUserDetails();
  });

  return (
    <>
      <Container>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon fontSize="large" sx={{ mr: 1 }} color="primary" />
            <Typography variant="h4">My Profile</Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              navigate("/profile/edit");
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Container>

      <Container>
        <Grid
          container
          spacing={3}
          columns={16}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item lg={8} md={16} sm={16} xs={16}>
            <Card sx={{ display: "flex", p: 2 }}>
              <Avatar
                src={user.profileImg}
                sx={{
                  height: 88,
                  width: 88,
                  border: "2px solid #f0f0f0",
                  mr: 1.5,
                }}
              />
              <Box>
                <Typography variant="h5">
                  <strong>
                    {user.firstName}, {user.lastName}
                  </strong>
                </Typography>
                <Typography variant="h5" color="primary">
                  {user.email}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={2} md={4} sm={4} xs={4}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 120,
                }}
              >
                <Typography>All Orders</Typography>
                <Typography variant="h4" color="primary">
                  16
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={2} md={4} sm={4} xs={4}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 120,
                }}
              >
                <Typography>Pending</Typography>
                <Typography variant="h4" color="primary">
                  2
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={2} md={4} sm={4} xs={4}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 120,
                }}
              >
                <Typography>Awaiting Shipping</Typography>
                <Typography variant="h4" color="primary">
                  5
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={2} md={4} sm={4} xs={4}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 120,
                }}
              >
                <Typography>Awaiting Collection</Typography>
                <Typography variant="h4" color="primary">
                  2
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
