import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Divider,
  ImageListItem,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SummarizeIcon from "@mui/icons-material/Summarize";

import LogIn from "./modals/LogIn";
import SignUp from "./modals/SignUp";

import AuthContext from "../context/AuthContext";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  let { currentUser, logoutUser } = useContext(AuthContext);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // login and sign in modals
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
    handleMenuClose();
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    handleMenuClose();
  };

  const handleLogOut = () => {
    logoutUser();
    handleMenuClose();
  };

  // profile menu here
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {currentUser && <MenuItem onClick={handleLogOut}>Log out</MenuItem>}
      {currentUser && (
        <MenuItem component={RouterLink} to={`/profile`}>
          My Profile
        </MenuItem>
      )}

      {!currentUser && <MenuItem onClick={handleOpenSignUp}>Sign up</MenuItem>}
      {!currentUser && <MenuItem onClick={handleOpenLogIn}>Log in</MenuItem>}
    </Menu>
  );

  return (
    <>
      {openLogIn && <LogIn openLogIn={openLogIn} setOpenLogIn={setOpenLogIn} />}

      {openSignUp && (
        <SignUp
          openSignUp={openSignUp}
          setOpenSignUp={setOpenSignUp}
          setOpenLogIn={setOpenLogIn}
        />
      )}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "white" }}>
          <Toolbar>
            <ImageListItem
              component={RouterLink}
              to={`/`}
              sx={{
                m: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img
                src="https://i.imgur.com/humcMjg.png"
                style={{ height: "45px" }}
                alt="logo"
              />
            </ImageListItem>

            {currentUser && (
              <Typography ml={5}>
                Hello,{" "}
                <strong>
                  {currentUser?.is_seller
                    ? "SELLER: " +
                      currentUser.first_name +
                      ", id:" +
                      currentUser.user_id
                    : "BUYER: " +
                      currentUser.first_name +
                      ", id:" +
                      currentUser.user_id}
                </strong>
              </Typography>
            )}

            <Box sx={{ flexGrow: 1 }} />
            {currentUser?.is_seller && <Button>Add a product</Button>}

            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              {currentUser?.is_buyer && (
                <IconButton
                  size="large"
                  aria-label="show cart items"
                  color="primary"
                  component={RouterLink}
                  to={`/cart`}
                >
                  <Badge color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              )}

              <IconButton
                size="large"
                color="primary"
                component={RouterLink}
                to={`/orders`}
              >
                <SummarizeIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>

      <Divider sx={{ mb: 4 }} />
    </>
  );
}
