import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./OrderLinesList.css";

const OrderLinesList = () => {
  const [orderLines, setOrderLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://minizuba-fn.azurewebsites.net/api/orderlines?type_id=2"
        );

        const rowsWithId = response.data.map((row) => ({
          ...row,
          id: row.OrderLineID.toString(),
        }));

        setOrderLines(rowsWithId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order lines:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "OrderLineID", headerName: "OrderLineID", width: 120 },
    { field: "OrderID", headerName: "OrderID", width: 120 },
    { field: "StockItemID", headerName: "StockItemID", width: 120 },
    { field: "Description", headerName: "Description", width: 300 },
    {
      field: "PackageTypeID",
      headerName: "PackageTypeID",
      width: 120,
      cellClassName: (params) => {
        switch (params.value) {
          case 1:
            return "package-type-1";
          case 2:
            return "package-type-2";
          case 3:
            return "package-type-3";
          case 4:
            return "package-type-4";
          default:
            return "";
        }
      },
    },
    { field: "Quantity", headerName: "Quantity", width: 120 },
    { field: "UnitPrice", headerName: "UnitPrice", width: 120 },
  ];

  return (
    <div className='custom-padding'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          className="custom-data-grid"
          rows={orderLines}
          columns={columns}
          pageSize={5}
          pagination
          checkboxSelection
          sortingOrder={["asc"]}
          headerClassName="custom-header"
          components={{
            Toolbar: () => (
              <div className="custom-toolbar">Order Lines List</div>
            ),
          }}
          rowClassName={(params) =>
            `custom-row ${params.data.PackageTypeID === 1 ? "type-1" : ""}`
          }
        />
      )}
    </div>
  );
};

export default OrderLinesList;
