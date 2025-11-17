import React, { useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Box,
  Button,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart = [] } = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        background: "linear-gradient(90deg, #2c3e50, #4ca1af)",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side: Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RestaurantMenuIcon sx={{ mr: 1, color: "#ffcc00" }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Canteen
            </Typography>
          </Box>

          {/* Center: Navigation Links */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            {[
              { label: "Home", path: "/" },
              { label: "Orders", path: "/orders" },
              { label: "Login", path: "/login" },
            ].map((nav) => (
              <Button
                key={nav.path}
                component={RouterLink}
                to={nav.path}
                sx={{
                  color: isActive(nav.path) ? "#ffcc00" : "#fff",
                  fontWeight: isActive(nav.path) ? 700 : 500,
                  "&:hover": { color: "#ffcc00", transform: "translateY(-1px)" },
                  transition: "all 0.2s ease",
                }}
              >
                {nav.label}
              </Button>
            ))}
          </Box>

          {/* Right side: Cart icon */}
          <IconButton
            component={RouterLink}
            to="/cart"
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Badge
              badgeContent={itemCount}
              color="warning"
              overlap="circular"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
