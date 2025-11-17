// src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  Divider,
  Chip,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete as DeleteIcon,
  Payment,
  ArrowBack,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import API from "../api";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } =
    useContext(CartContext);

  // 🧾 Place Order
  const placeOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login first!");

    if (cart.length === 0) return alert("Your cart is empty!");

    try {
      const order = { userId, items: cart, totalAmount };
      const res = await API.post("/api/orders", order);
      alert(res.data.message || "Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Order Error:", err);
      alert(err.response?.data?.message || "Failed to place order. Try again!");
    }
  };

  // 🛒 Empty Cart View
  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          🛒 Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Add some tasty dishes to get started.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBack />}
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  // 🧺 Cart View
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            {cart.map((item) => (
              <Box
                key={item._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 2,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {/* Item Info */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {item.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={item.category || "Food"}
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                  />
                </Box>

                {/* Quantity Controls */}
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        Math.max(1, Number(e.target.value))
                      )
                    }
                    inputProps={{
                      min: 1,
                      style: { width: 48, textAlign: "center" },
                    }}
                    sx={{ mx: 1 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                {/* Price + Delete */}
                <Typography
                  sx={{ width: 96, textAlign: "right", mr: 2 }}
                  fontWeight={600}
                >
                  ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => removeFromCart(item._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Total & Clear */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Typography variant="h6" fontWeight={800}>
                Total: ₹{Number(totalAmount).toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              position: { md: "sticky" },
              top: 16,
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>₹{Number(totalAmount).toFixed(2)}</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">Delivery</Typography>
              <Typography>Free</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Button
              fullWidth
              variant="contained"
              startIcon={<Payment />}
              onClick={placeOrder}
              sx={{
                py: 1.2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
