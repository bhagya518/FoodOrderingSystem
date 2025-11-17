// src/pages/Home.js
import React, { useState, useContext, useEffect } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search, FilterList } from "@mui/icons-material";

const Hero = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://source.unsplash.com/1600x600/?restaurant,food)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  textAlign: "center",
  padding: theme.spacing(10, 2),
  marginBottom: theme.spacing(5),
}));

const SearchWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  maxWidth: 720,
  margin: "0 auto",
  width: "100%",
  flexWrap: "wrap",
}));

const Home = () => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get("/api/menu")
      .then((res) => setMenu(res.data || []))
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setMenu([]);
      });
  }, []);

  // Dynamic categories
  const categories = [
    "all",
    ...Array.from(new Set(menu.map((m) => m.category?.toLowerCase()).filter(Boolean))),
  ];

  // Filter logic
  const filtered = menu.filter((item) => {
    const matchesText = item.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "all" || item.category?.toLowerCase() === category;
    return matchesText && matchesCat;
  });

  return (
    <Box>
      {/* Hero Section */}
      <Hero>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Delicious Food Delivered
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.95, mb: 4 }}>
          Explore our menu and add your favorites to the cart.
        </Typography>

        <SearchWrap>
          <TextField
            fullWidth
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: "white", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            startIcon={<FilterList />}
            sx={{ px: 3, borderRadius: 2 }}
            onClick={() => {
              setCategory("all");
              setSearch("");
            }}
          >
            Reset
          </Button>
        </SearchWrap>
      </Hero>

      {/* Menu Section */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight={800}>
            Our Menu
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {categories.map((c) => (
              <Button
                key={c}
                size="small"
                variant={category === c ? "contained" : "outlined"}
                onClick={() => setCategory(c)}
                sx={{ textTransform: "capitalize", borderRadius: 999 }}
              >
                {c}
              </Button>
            ))}
          </Box>
        </Box>

        {filtered.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              No items found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting filters or seed sample menu data.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
                <MenuCard item={item} addToCart={addToCart} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
