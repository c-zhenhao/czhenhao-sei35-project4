import React, { useState } from "react";

import {
  Typography,
  Card,
  Avatar,
  Stack,
  Button,
  Box,
  Grid,
  IconButton,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";

export default function Cart({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);

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

  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            p={1}
          >
            <Grid item>
              <Avatar
                variant="rounded"
                src={product.imgUrl}
                sx={{ width: 125, height: 125 }}
              ></Avatar>
            </Grid>

            <Grid item>
              <Typography variant="h6" nowrap="true">
                {product.name}
              </Typography>
              <Typography>${product.price}</Typography>
            </Grid>

            <Grid item>
              <Stack direction="row" alignItems="flex-start">
                <Button
                  variant="contained"
                  onClick={handleMinus}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </Button>
                <Box ml={3} mr={3} p={1}>
                  <Typography>{quantity}</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={handlePlus}
                  disabled={quantity >= product.stock}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Grid>

            <Grid item>
              <Typography>
                Total price: ${(product.price * quantity).toFixed(2)}
              </Typography>
            </Grid>

            <Grid item>
              <IconButton onClick={() => {}}>
                <ClearIcon color="warning" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
