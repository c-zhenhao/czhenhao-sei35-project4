import React, { useState } from "react";

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

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);

  // progress bar
  let priceProgress = (product.priceCurrent / product.priceEnd) * 100;

  // quantityButtonHandlers
  function handlePlus() {
    if (quantity !== product.stock) {
      setQuantity(quantity + 1);
    }
  }

  function handleMinus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAddToCart() {
    // call api to update cart
    console.log(`add ${quantity} of ${product.name} to cart`);
  }

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12} alignItems="center">
            <Card elevation={0} sx={{ maxHeight: 300 }}>
              <CardMedia component="img" image={product.imgUrl} />
            </Card>
          </Grid>

          <Grid item md={6} xs={12} alignItems="center">
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" component="p" marginTop={0}>
                  <strong>Progress: </strong> {priceProgress}% filled!
                </Typography>
              </Box>

              <Box>
                <ProgressBar value={priceProgress} />
              </Box>

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
          </Stack>
        </Grid>
      </Container>
    </>
  );
}
