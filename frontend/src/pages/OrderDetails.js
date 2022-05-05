import React from "react";
import { useParams } from "react-router-dom";

import { Container, Typography, Avatar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const handleClick = (event, cellValues) => {
  console.log(`button is clicked`);
  console.log(cellValues.row);
};

const handleRowClick = (param, event) => {
  console.log(`row is clicked`);
  console.log(param.row);
};

const handleCellClick = (param, event) => {
  console.log(`cell is clicked`);
  console.log(param);
};

const columns = [
  {
    field: " ",
    sortable: false,
    renderCell: (cellValues) => {
      console.log(cellValues);
      let image = cellValues.row.product_image;
      let alt = cellValues.row.id;

      return <Avatar src={{ image }} alt={{ alt }} />;
    },
  },
  {
    field: "product_name",
    headerName: "order_created_time",
    width: 200,
    flex: 1,
  },
  {
    field: "product_price",
    headerName: "quantity",
    width: 200,
    flex: 1,
  },
  {
    field: "product_quantity",
    headerName: "price",
    width: 200,
    flex: 1,
  },
  {
    field: "sub_total",
    headerName: "price",
    width: 200,
    flex: 1,
  },
];

const rows = [
  {
    id: 1,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 2,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 3,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 4,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 5,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 6,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 7,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
  {
    id: 8,
    product_image:
      "https://assets.sg.pickupp.io/products/800_800/product_baa7.jpg",
    product_name: "ang ku kueh",
    product_price: 42.9,
    product_quantity: 2,
    sub_total: 42.9 * 2,
  },
];

export default function OrderDetails() {
  let { id } = useParams();

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Order ID: {id} details
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Customer name: firstName, lastName
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Customer email: email@email.com
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Status: pending
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Created Time: 2022-05-01 01:45:02.937971+08
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Updated Time: 2022-05-01 01:45:02.937971+08
      </Typography>

      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          onRowClick={() => {}}
          onCellClick={() => {}}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      <Container sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Order Grand Total: $ xx.xx
        </Typography>
      </Container>
    </Container>
  );
}
