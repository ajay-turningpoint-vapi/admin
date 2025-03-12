import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import SingleFileUpload from "../../Utility/SingleFileUpload";
import {
  addReedemProduct,
  editReedemProduct,
} from "../../../redux/actions/Product/ReedemableProduct.actions";

const AddRedeemableProduct = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(product); // Check if editing an existing product

  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });
  const [imageStr, setImageStr] = useState(null);
  const [errors, setErrors] = useState({});

  // Populate fields when editing
  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name,
        price: product.diamond,
        stock: product.stock,
      });
      setImageStr(product.image);
    } else {
      setFormData({ name: "", price: "", stock: "" });
      setImageStr(null);
    }
  }, [product]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than zero.";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Stock cannot be negative.";
    if (!imageStr) newErrors.image = "Please upload an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSet = (value) => {
    setImageStr(value.fileUrl);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newProduct = {
      name: formData.name,
      diamond: formData.price,
      stock: formData.stock,
      image: imageStr,
    };

    if (isEditMode) {
      dispatch(editReedemProduct(product._id, newProduct));
    } else {
      dispatch(addReedemProduct(newProduct));
    }

    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? "Edit Redeemable Product" : "Add Redeemable Product"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Product Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Price (Diamonds)"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            error={!!errors.price}
            helperText={errors.price}
          />

          <TextField
            label="Stock"
            type="number"
            fullWidth
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            error={!!errors.stock}
            helperText={errors.stock}
          />

          <SingleFileUpload onFileChange={handleFileSet} />
          {errors.image && (
            <Typography color="error">{errors.image}</Typography>
          )}

          {imageStr && (
            <Box sx={{ textAlign: "center" }}>
              <img
                src={imageStr}
                alt="Product Preview"
                style={{
                  maxWidth: "100%", // Ensures it doesn't exceed the container width
                  maxHeight: "300px", // Allows full image height
                  height: "auto", // Maintains aspect ratio
                  display: "block",
                  margin: "auto",
                }}
              />
            </Box>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddRedeemableProduct;
