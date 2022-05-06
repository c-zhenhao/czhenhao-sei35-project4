import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { Container, Typography, Button, Link } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import AuthContext from "../context/AuthContext";

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
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Link",
    renderCell: (cellValues) => {
      return <Link href={`/orders/${cellValues.row.id}`}>See details</Link>;
    },
  },
  {
    field: "order_created_time",
    headerName: "order_created_time",
    width: 200,
    flex: 1,
  },
  {
    field: "order_updated_time",
    headerName: "order_updated_time",
    width: 200,
    flex: 1,
  },
  {
    field: "order_status",
    headerName: "order_status",
    width: 200,
    flex: 1,
  },
  {
    field: "Action",
    sortable: false,
    flex: 1,
    renderCell: (cellValues) => {
      let status = cellValues.row.order_status;
      return (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
          disabled={
            status === "Pending"
              ? false
              : status === "Processing"
              ? false
              : true
          }
        >
          Cancel Order
        </Button>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    order_created_time: "2022-05-01 01:45:02.937971+08",
    order_updated_time: "2022-05-02 01:45:02.937971+08",
    order_status: "Pending",
  },
  {
    id: 2,
    order_created_time: "2022-05-01 01:45:02.937971+08",
    order_updated_time: "2022-05-02 01:45:02.937971+08",
    order_status: "Pending",
  },
  {
    id: 3,
    order_created_time: "2022-05-02 01:45:02.937971+08",
    order_updated_time: "2022-05-02 01:45:02.937971+08",
    order_status: "Processing",
  },
  {
    id: 4,
    order_created_time: "2022-05-03 01:45:02.937971+08",
    order_updated_time: "2022-05-03 01:45:02.937971+08",
    order_status: "Waiting Collection",
  },
  {
    id: 5,
    order_created_time: "2022-05-04 01:45:02.937971+08",
    order_updated_time: "2022-05-04 01:45:02.937971+08",
    order_status: "In Transit",
  },
  {
    id: 6,
    order_created_time: "2022-05-04 01:45:02.937971+08",
    order_updated_time: "2022-05-04 01:45:02.937971+08",
    order_status: "Completed",
  },
  {
    id: 7,
    order_created_time: "2022-05-04 01:45:02.937971+08",
    order_updated_time: "2022-05-04 01:45:02.937971+08",
    order_status: "Cancelled",
  },
];

const order_status_types = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "PROCESSING",
    label: "Processing",
  },
  {
    value: "INTRANSIT",
    label: "In transit",
  },
  {
    value: "WAITING",
    label: "Waiting Collection",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export default function Orders() {
  const [isNotLoading, setIsNotLoading] = useState(false);
  const [userOrders, setUserOrders] = useState();

  let { currentUser } = useContext(AuthContext);

  async function getAllOrders() {
    const url = `http://127.0.0.1:8000/api/orders/`;
    const response = await axios.get(url);
    console.log(response.data);

    console.log(currentUser?.user_id);
    let currentUserId = currentUser?.user_id;

    let ordersArr = response.data;
    let filteredOrderArr = ordersArr.filter((x) => x.user === currentUserId);
    console.log(filteredOrderArr);
    setUserOrders(filteredOrderArr);

    setIsNotLoading(true);
  }

  useEffect(() => {
    getAllOrders();
  }, [isNotLoading]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Orders
      </Typography>

      <div style={{ width: "100%" }}>
        {isNotLoading && (
          <DataGrid
            autoHeight
            rows={userOrders}
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
        )}
      </div>
    </Container>
  );
}
