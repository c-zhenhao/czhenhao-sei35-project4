import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import ProductCard from "../components/ProductCard";

import products from "../fedata/product";

export default function Home() {
  const [isNotLoading, setIsNotLoading] = useState(false);
  const [displayProducts, setDisplayProducts] = useState();

  useEffect(() => {
    getDisplayProducts();
  }, [setIsNotLoading]);

  async function getDisplayProducts() {
    const url = `http://127.0.0.1:8000/api/products`;

    const response = await axios.get(url);
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);
      setDisplayProducts(response.data);

      setIsNotLoading(true);
    } else {
      alert("failed to get products");
    }
  }

  return (
    <Container>
      <Stack>
        <Typography variant="h4" marginBottom={2}>
          All the Stuffs
        </Typography>

        {isNotLoading && (
          <Grid container spacing={2}>
            {displayProducts.map((productp, index) => (
              <ProductCard productp={productp} key={index} />
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
