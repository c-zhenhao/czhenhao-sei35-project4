import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

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
  console.log(id);
  const [isNotLoading, setIsNotLoading] = useState(false);
  const [orderFirstName, setOrderFirstName] = useState();
  const [orderLastName, setOrderLastName] = useState();
  const [orderEmail, setOrderEmail] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [orderCreatedTime, setOrderCreatedTime] = useState();
  const [orderUpdatedTime, setOrderUpdatedTime] = useState();

  useEffect(() => {
    getOrders();
  }, [isNotLoading]);

  async function getOrders() {
    const url = `http://127.0.0.1:8000/api/orders/${id}`;

    const response = await axios.get(url);
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);

      // order details
      const fetchedData = response.data;
      console.log(fetchedData.order_status);
      setOrderStatus(fetchedData.order_status);
      setOrderCreatedTime(fetchedData.order_created_time);
      setOrderUpdatedTime(fetchedData.order_updated_time);

      // get user details
      const orderUserId = fetchedData.user;

      const orderUserData = await axios.get(
        `http://127.0.0.1:8000/api/accounts/userid/${orderUserId}`
      );
      console.log(orderUserData.data);
      let oud = orderUserData.data;
      console.log(oud);

      // update states with info to use below
      setOrderFirstName(oud.first_name);
      setOrderLastName(oud.last_name);
      setOrderEmail(oud.email);

      setIsNotLoading(true);
    } else {
      alert("failed to get orders");
    }
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Order details for Order ID: <strong>{id}</strong>
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Customer name: {orderFirstName}, {orderLastName}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Customer email: {orderEmail}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Status: {orderStatus}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Created Time: {orderCreatedTime}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Updated Time: {orderUpdatedTime}
      </Typography>

      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={null}
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
