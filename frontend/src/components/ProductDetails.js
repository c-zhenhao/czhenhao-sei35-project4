import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import ProgressBar from "./ProgressBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductDetails() {
  let { currentUser } = useContext(AuthContext);
  let productIdLink = useParams();
  let productId = productIdLink.id;
  console.log(productId);

  const [isNotLoading, setIsNotLoading] = useState(false);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();
  // const [progress, setProgress] = useState();

  useEffect(() => {
    getProductDetails();
  }, [isNotLoading]);

  async function getProductDetails() {
    const url = `http://127.0.0.1:8000/api/products/${productId}`;

    const response = await axios.get(url);
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);
      setProduct(response.data);

      // calculate progress
      // setProgress(
      //   ((product.stockStart - product.stock) / product.stockStart) * 100
      // );

      setIsNotLoading(true);
    } else {
      alert("failed to retrieve product");
    }
  }

  // quantityButtonHandlers
  function handlePlus() {
    if (quantity !== product.stock) {
      setQuantity(quantity + 1);
      setPrice(quantity * product.price);
    }
  }

  function handleMinus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(quantity * product.price);
    }
  }

  async function handleAddToCart() {
    console.log(quantity);
    console.log(productId);
    console.log(price);
    console.log(currentUser.user_id);

    const addItemToCartDetails = {
      quantity: quantity,
      product: productId,
      price: price,
      user: currentUser.user_id,
    };

    const url = "http://127.0.0.1:8000/api/cart/";
    const data = JSON.stringify(addItemToCartDetails);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, data, config);

    if (response.status === 201) {
      console.log(response.data);
      alert("added to cart!");
    } else {
      alert("add to cart failed");
    }
  }

  async function handleDeleteProduct() {
    console.log(productId);
    const url = `http://127.0.0.1:8000/api/products/${productId}`;

    const response = await axios.delete(url);

    if (response.status === 204) {
      console.log(response);
      alert("product deleted");
    } else {
      alert("delete product failed");
    }
  }

  return (
    <>
      <Container>
        <Typography variant="h4"> Product Details </Typography>
      </Container>

      <Divider variant="middle" />

      {isNotLoading && (
        <Container>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} alignItems="center">
              <Card elevation={0} sx={{ maxHeight: 300 }}>
                <CardMedia
                  component="img"
                  image={product.imgUrl}
                  alt={product.id}
                  sx={{
                    objectFit: "scale-down",
                    maxHeight: 300,
                  }}
                />
              </Card>
            </Grid>

            <Grid item md={6} xs={12} alignItems="center">
              <Stack spacing={2}>
                {/* <Box>
                  <Typography variant="body2" component="p" marginTop={0}>
                    <strong>Progress: </strong> {progress}% filled!
                  </Typography>
                </Box>

                <Box>
                  <ProgressBar value={progress} />
                </Box> */}

                <Box>
                  <Typography variant="h4">{product.name}</Typography>
                </Box>

                <Box>
                  <Typography variant="h3">$ {product.price}</Typography>
                </Box>

                <Box>
                  <strong>Stock: </strong>
                  {product.stock > 0 ? product.stock : "Out of stock"}
                </Box>

                <Box>
                  <Typography>
                    <strong>Start Date: </strong>
                    {product.dateStart}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    <strong>End Date: </strong>
                    {product.dateEnd}
                  </Typography>
                </Box>

                <Stack direction="row" alignItems="center">
                  <Typography mr={1.5}>
                    <strong>Quantity: </strong>
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleMinus}
                    disabled={quantity <= 1 || product.status === "OOS"}
                  >
                    <RemoveIcon />
                  </Button>
                  <Box ml={3} mr={3} p={1}>
                    <Typography>{quantity}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={handlePlus}
                    disabled={product.status === "OOS"}
                  >
                    <AddIcon />
                  </Button>
                </Stack>

                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  disabled={product.status === "OOS"}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Box marginBottom={-2}>
            <Typography variant="h6">
              <strong>Description: </strong>
            </Typography>
          </Box>

          <Grid item marginTop={3}>
            <Divider />
          </Grid>

          <Grid item marginTop={2}>
            <Stack>
              <Typography variant="h6">{product.description}</Typography>
              <Typography variant="subtitle" mt={2} mb={2}>
                product.id: {product.id}
              </Typography>

              {currentUser?.is_seller && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleDeleteProduct}
                >
                  Delete product
                </Button>
              )}
            </Stack>
          </Grid>
        </Container>
      )}
    </>
  );
}
