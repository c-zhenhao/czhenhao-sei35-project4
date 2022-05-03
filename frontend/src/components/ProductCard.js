import React from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AccessTime } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";

import ProgressBar from "./ProgressBar";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: "body3",
          },
          style: {
            fontSize: 11,
          },
        },
      ],
    },
  },
});

export default function ProductCard({ product }) {
  return (
    <Grid item xs={3}>
      <ThemeProvider theme={theme}>
        <CardActionArea component={NavLink} to={`/product/${product.id}`}>
          <Card>
            <Paper elevation={1}>
              <img className="img" src={product.imgUrl} alt={product.name} />

              <Box paddingX={1}>
                <Typography variant="subtitle" component="h2">
                  {product.name}
                </Typography>

                <Box>
                  <Typography variant="body2" component="p" marginTop={0}>
                    Progress:{" "}
                    {product.priceCurrent.toLocaleString("en-us", {
                      style: "currency",
                      currency: "sgd",
                    })}{" "}
                    of{" "}
                    {product.priceEnd.toLocaleString("en-us", {
                      style: "currency",
                      currency: "sgd",
                    })}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <ProgressBar variant="determinate" value={100} />
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Typography variant="h6" component="h3" marginTop={0}>
                    ${product.price.toFixed(2)} per unit
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" component="p">
                    <AccessTime
                      sx={{ width: "0.5em", marginRight: "0.5rem" }}
                    />
                    ENDS ON {product.dateEnd}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Card>
        </CardActionArea>
      </ThemeProvider>
    </Grid>
  );
}
