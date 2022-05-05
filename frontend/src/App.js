import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

// public routes
import PrimarySearchAppBar from "./components/NavBar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

// private routes
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "light",
    primary: {
      main: "#7faa99",
    },
    secondary: {
      main: "#f7deb0",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <PrimarySearchAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
