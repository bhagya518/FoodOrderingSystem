import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { CartContext } from "../context/CartContext";

const statusColor = (status) => {
  switch (status) {
    case "preparing":
      return "warning";
    case "on-the-way":
      return "secondary";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const Orders = () => {
  const { addToCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Please log in to view your orders.");
      setLoading(false);
      return;
    }

    API.get(`/api/orders/${userId}`)
      .then((res) => setOrders(res.data || []))
      .catch(() => setError("Failed to fetch orders"))
      .finally(() => setLoading(false));
  }, []);

  const handleReorder = (order) => {
    order.items.forEach((item) => addToCart(item));
    alert("Items added to your cart!");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your orders...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          You have no orders yet
        </Typography>
        <Typography color="text.secondary">
          Place your first order and it will appear here.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Paper
          key={order._id}
          elevation={2}
          sx={{ p: 3, mb: 3, borderRadius: 3, backgroundColor: "#fafafa" }}
        >
          {/* Order Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Order #{String(order._id).slice(-6)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ordered on {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Chip
              label={order.status}
              color={statusColor(order.status)}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Item List */}
          <List dense disablePadding>
            {order.items.map((i, idx) => (
              <ListItem
                key={`${i._id || i.name}-${idx}`}
                disableGutters
                secondaryAction={
                  <Typography fontWeight={700}>
                    ₹{(Number(i.price) * Number(i.quantity)).toFixed(2)}
                  </Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={i.image}
                    alt={i.name}
                    sx={{ bgcolor: "#f5f5f5" }}
                  >
                    {i.name?.[0] || "F"}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${i.name} × ${i.quantity}`}
                  secondary={i.category}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Total & Reorder Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">Total</Typography>
            <Typography variant="h6" fontWeight={800}>
              ₹{Number(order.totalAmount).toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleReorder(order)}
            >
              Reorder
            </Button>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default Orders;
