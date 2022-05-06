import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Container, Typography, Button, Link } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const handleRowClick = (param, event) => {
  console.log(`row is clicked`);
  console.log(param.row);
};

const handleCellClick = (param, event) => {
  console.log(`cell is clicked`);
  console.log(param);
};

async function handleClick(event, cellValues) {
  console.log(event.target);
  console.log(cellValues.row.id);

  let completeOrderId = cellValues.row.id;

  const url = `http://127.0.0.1:8000/api/orders/${completeOrderId}`;
  const data = JSON.stringify({ order_status: "COMPLETED" });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.patch(url, data, config);

  if (response.status === 200) {
    console.log(response.data);
    alert("order completed!");
    window.location.reload();
  } else {
    alert("complete order failed");
  }
}

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
          color="success"
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
          disabled={
            status !== "COMPLETED"
              ? false
              : status === "PROCESSING"
              ? false
              : true
          }
        >
          Complete Order
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
  const [orders, setOrders] = useState([]);
  const [isNotLoading, setIsNotLoading] = useState(false);

  useEffect(() => {
    getOrders();
  }, [isNotLoading]);

  async function getOrders() {
    const url = "http://127.0.0.1:8000/api/orders/";

    const response = await axios.get(url);
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);
      console.log(typeof response.data);
      setOrders(response.data);

      setIsNotLoading(true);
    } else {
      alert("failed to get orders");
    }
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        All Orders
      </Typography>

      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={orders}
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
    </Container>
  );
}
