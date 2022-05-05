import React from "react";
import { NavLink } from "react-router-dom";

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  CardActions,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";

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

export default function ProductCard({ productp }) {
  console.log(productp.id);
  console.log(
    `current stock: ${productp.stock}, total stock: ${
      productp.stockStart
    }, numbers for progressBar ${productp.stockStart - productp.stock}`
  );

  return (
    <Grid item sm={12} md={12} lg={6} xl={3}>
      <ThemeProvider theme={theme}>
        <Card sx={{ minHeight: 400 }}>
          <CardActionArea component={NavLink} to={`/product/${productp.id}`}>
            <CardMedia
              component="img"
              height="200"
              image={productp.imgUrl}
              alt={productp.name}
            />

            <CardContent>
              <Box paddingX={0.5}>
                <Typography variant="h6" noWrap={true}>
                  {productp.name}
                </Typography>

                <Box>
                  <Typography variant="subtitle2" marginTop={0.5}>
                    Progress:{" "}
                    {((productp.stockStart - productp.stock) /
                      productp.stockStart) *
                      100}
                    %
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <ProgressBar
                    variant="determinate"
                    value={
                      ((productp.stockStart - productp.stock) /
                        productp.stockStart) *
                      100
                    }
                  />
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Typography variant="h6" mt={1.5}>
                    ${productp.price}
                    <Typography variant="h7"> per unit</Typography>
                  </Typography>
                </Box>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" component="p">
                    <AccessTime
                      sx={{
                        width: "0.5em",
                        marginRight: "0.5rem",
                      }}
                    />
                    ENDS IN {productp.dateEnd}
                  </Typography>
                </CardActions>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </ThemeProvider>
    </Grid>
  );
}
