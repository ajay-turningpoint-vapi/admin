import {
  deleteReedemProduct,
  fetchReedemProducts,
} from "../../redux/actions/Product/ReedemableProduct.actions";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { DashboardTable } from "../Utility/DashboardBox";

import DataTable from "react-data-table-component";
import DiamondIcon from "@mui/icons-material/Diamond";
import toast from "react-hot-toast";
import AddRedeemableProduct from "./AddProduct/AddRedeemableProduct";

const RedeemableProductList = ({ userId }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.redeemableProduct
  );

  const [quantities, setQuantities] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchReedemProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`, { position: "top-right" });
    }
  }, [error]);

  const handleRedeem = (productId) => {
    const quantity = Math.max(1, Number(quantities[productId] || 1)); // Prevent negative/zero quantity
    console.log(
      `Redeeming ${quantity} of product ${productId} for user ${userId}`
    );
    // dispatch(redeemProduct({ userId, productId, quantity }));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteReedemProduct(productId));
      toast.success("Product deleted successfully");
    }
  };

  const productList = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },

    {
      name: "Image",
      sortable: true,
      cell: (row) => (
        <img
          src={row?.image}
          alt="product"
          style={{ width: "70px", height: "70px" }}
        />
      ),
      width: "15%",
    },
    {
      name: "Name",
      cell: (row) => <p>{row.name}</p>,
      width: "20%",
    },
    {
      name: "Diamond",
      sortable: true,
      selector: "value",
      cell: (row) =>
        row?.diamond ? (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <DiamondIcon style={{ color: "#FFD700" }} />
            <p>({row.diamond})</p>
          </div>
        ) : (
          <p>No Diamond</p>
        ),
      width: "15%",
    },
    {
      name: "Stock",
      sortable: true,
      cell: (row) =>
        row?.stock ? (
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              width: "30px",
              textAlign: "center",
              borderRadius: "15px",
            }}
          >
            {row.stock}
          </p>
        ) : (
          <p>No Stock</p>
        ),
      width: "15%",
    },

    {
      name: "Created At",
      sortable: true,
      cell: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
      width: "15%",
    },

    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <DashboardTable>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h5 className="blue-1 mb-2">Product Lists</h5>

          <Button
            variant="contained"
            onClick={() => {
              setSelectedProduct(null);
              setDialogOpen(true);
            }}
            sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}

          >
            Add Product
          </Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={productList} data={products} pagination />
        )}
      </DashboardTable>
      <AddRedeemableProduct
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default RedeemableProductList;
