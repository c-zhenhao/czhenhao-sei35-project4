import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import ProductCard from "../components/ProductCard";

import products from "../fedata/product";

export default function Home() {
  return (
    <Container>
      <Grid>
        <Stack>
          <Typography variant="h4" marginBottom={2}>
            All the Stuffs
          </Typography>
          <>
            <Grid container spacing={5}>
              {products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </Grid>
          </>
        </Stack>
      </Grid>
    </Container>
  );
}
