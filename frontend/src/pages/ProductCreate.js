import React, { useState } from "react";

import axios from "axios";

import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  TextField,
} from "@mui/material";

export default function ProfileEdit() {
  // products inputs
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [price, setPrice] = useState();
  const [priceEnd, setPriceEnd] = useState();
  const [stock, setStock] = useState();
  const [stockStart, setStockStart] = useState();

  function handleNameChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    console.log(event.target.value);
    setDescription(event.target.value);
  }

  function handleImgUrlChange(event) {
    console.log(event.target.value);
    setImgUrl(event.target.value);
  }

  function handlePriceChange(event) {
    console.log(event.target.value);
    setPrice(event.target.value);
  }

  // function handlePriceEndChange(event) {
  //   console.log(event.target.value);
  //   setPriceEnd(event.target.value);
  // }

  function handleStockChange(event) {
    console.log(event.target.value);
    setStock(event.target.value);
  }

  function handleStockStartChange(event) {
    console.log(event.target.value);
    setStockStart(event.target.value);
  }

  async function createProduct(productDetails) {
    const url = "http://127.0.0.1:8000/api/products/";
    const data = JSON.stringify(productDetails);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, data, config);

    if (response.status === 201) {
      console.log(response.data);
    } else {
      alert("product creation failed");
    }
  }

  function handleSubmit(event) {
    console.log(event);

    const productDetails = {
      name: name,
      description: description,
      imgUrl: imgUrl,
      price: price,
      // priceEnd,
      stock: stock,
      stockStart: stockStart,
    };

    console.log(productDetails);

    createProduct(productDetails);
  }

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Create Product
        </Typography>

        <Container component="main" maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                    name="product name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    autoFocus
                    onChange={handleNameChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    autoFocus
                    onChange={handleDescriptionChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="imgUrl"
                    variant="outlined"
                    fullWidth
                    required
                    id="imgUrl"
                    label="Image URL"
                    autoFocus
                    onChange={handleImgUrlChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="price"
                    variant="outlined"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    autoFocus
                    onChange={handlePriceChange}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="priceEnd"
                    variant="outlined"
                    required
                    fullWidth
                    id="priceEnd"
                    label="Ending Price"
                    autoFocus
                    onChange={handlePriceEndChange}
                  />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="stock"
                    variant="outlined"
                    required
                    fullWidth
                    id="stock"
                    label="Stock"
                    autoFocus
                    onChange={handleStockChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="stock"
                    variant="outlined"
                    required
                    fullWidth
                    id="stock"
                    label="Starting Stock"
                    autoFocus
                    onChange={handleStockStartChange}
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
