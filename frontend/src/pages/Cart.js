import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

import axios from "axios";

import { Container, Typography, Button, Box } from "@mui/material";

import products from "../fedata/product";

import CartItemCard from "../components/CartItemCard";

export default function Cart() {
  let { currentUser } = useContext(AuthContext);
  const [isNotLoading, setIsNotLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    getCartDetails();
  }, [isNotLoading]);

  async function getCartDetails() {
    const url = `http://127.0.0.1:8000/api/cart/${currentUser.user_id}`;

    const response = await axios.get(url);
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);
      const fetchedData = response.data;
      let cartProductArr = [];

      for (let i = 0; i < fetchedData?.length; i++) {
        let cartItemQty = fetchedData[i].quantity;
        let cartItemProductId = fetchedData[i].product;
        let fetchCart = await axios.get(
          `http://127.0.0.1:8000/api/products/${cartItemProductId}`
        );
        let fetchedCartItemData = fetchCart.data;
        console.log(fetchedCartItemData);

        const cartObject = {
          name: fetchedCartItemData.name,
          imgUrl: fetchedCartItemData.imgUrl,
          price: fetchedCartItemData.price,
          quantity: cartItemQty,
        };
        console.log(cartObject);
        cartProductArr.push(cartObject);
      }

      console.log(cartProductArr);
      setCartProducts(cartProductArr);

      setIsNotLoading(true);
    } else {
      alert("failed to load cart products");
    }
  }

  function handleCheckOutNow() {
    // send products to checkout
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Cart
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
        <Button variant="outlined" onClick={handleCheckOutNow}>
          Checkout Now
        </Button>
      </Box>

      {isNotLoading &&
        cartProducts.map((product, index) => (
          <CartItemCard product={product} key={index} />
        ))}
    </Container>
  );
}
