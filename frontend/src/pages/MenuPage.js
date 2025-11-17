// src/pages/MenuPage.js
import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Box, Container, TextField, InputAdornment, Button } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import API from "../api";
import MenuCard from "../components/MenuCard";
import { CartContext } from "../context/CartContext";

const MenuPage = () => {
  const { addToCart } = useContext(CartContext);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch menu from backend
  useEffect(() => {
    API.get("/api/menu")
      .then((res) => setMenuItems(res.data || []))
      .catch(() => {
        console.warn("Backend not reachable, using sample data.");
        setMenuItems([
          {
            id: 1,
            name: "Veg Biryani",
            category: "Meals",
            price: 120,
            rating: 4.3,
            discount: "30% OFF",
            img: "https://via.placeholder.com/150?text=Veg+Biryani",
          },
          {
            id: 2,
            name: "Pizza",
            category: "Snacks",
            price: 150,
            rating: 4.1,
            discount: "20% OFF",
            img: "https://via.placeholder.com/150?text=Pizza",
          },
          {
            id: 3,
            name: "Burger",
            category: "Snacks",
            price: 80,
            rating: 4.5,
            discount: "10% OFF",
            img: "https://via.placeholder.com/150?text=Burger",
          },
        ]);
      });
  }, []);

  // Filter items by search input
  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Get categories dynamically
  const categories = Array.from(
    new Set(filteredMenu.map((item) => item.category?.toLowerCase()).filter(Boolean))
  );

  // Group items by category
  const groupedMenu = categories.map((cat) => ({
    category: cat,
    items: filteredMenu.filter((item) => item.category?.toLowerCase() === cat),
  }));

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<FilterList />}
          onClick={() => setSearch("")}
        >
          Reset
        </Button>
      </Box>

      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "primary.main" }}>
        Explore Our Menu 🍴
      </Typography>

      {/* Menu Items grouped by category */}
      {groupedMenu.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", py: 10 }}>
          No items found
        </Typography>
      ) : (
        groupedMenu.map((group) => (
          <Box key={group.category} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: 700, textTransform: "capitalize" }}
            >
              {group.category}
            </Typography>
            <Grid container spacing={3}>
              {group.items.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id || item._id}>
                  <MenuCard item={item} addToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Container>
  );
};

export default MenuPage;
