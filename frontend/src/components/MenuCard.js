import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton, 
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add"; 
import RemoveIcon from "@mui/icons-material/Remove"; 

const MenuCard = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const resolveImageSrc = () => {
    const raw = item?.image || item?.img || '';
    if (!raw) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }

    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('data:')) {
      return raw;
    }

    const baseURL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const normalizedPath = raw.startsWith('/') ? raw : `/uploads/${raw}`;
    return `${baseURL}${normalizedPath}`;
  };

  const imageSrc = resolveImageSrc();

  // Function to handle increasing the quantity
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // Function to handle decreasing the quantity (min 1)
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Handle Add to Cart click
  const handleAddToCart = () => {
    // Call the context function, passing the item AND the current quantity
    addToCart(item, quantity);
    // Reset quantity to 1 after adding to cart for a clean next purchase
    setQuantity(1); 
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={imageSrc}
          alt={item.name}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        {item.discount && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor: "primary.main",
              color: "white",
              px: 1.5,
              py: 0.3,
              borderRadius: 1,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {item.discount}
          </Box>
        )}
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{item.price}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <StarIcon sx={{ color: "green", fontSize: 18 }} />
          <Typography variant="body2" ml={0.5}>
            {item.rating}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ 
        justifyContent: "space-between", 
        px: 2, 
        pb: 2 
      }}>
        {/* Quantity Controls Group */}
        <Box 
            display="flex" 
            alignItems="center" 
            sx={{ 
                border: '1px solid #ccc', 
                borderRadius: 1, 
                height: 36 // Match button height
            }}
        >
            {/* Decrement Button */}
            <IconButton 
                onClick={handleDecrement} 
                size="small"
                disabled={quantity === 1} // Disable when quantity is 1
            >
                <RemoveIcon fontSize="small" />
            </IconButton>

            {/* Quantity Display */}
            <Typography variant="body1" sx={{ px: 1, minWidth: 20, textAlign: 'center' }}>
                {quantity}
            </Typography>
            
            {/* Increment Button */}
            <IconButton 
                onClick={handleIncrement} 
                size="small"
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default MenuCard;