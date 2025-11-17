import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";

import PrivateRoute from "./components/PrivateRoute";
import { CartProvider } from "./context/CartContext";
import { CssBaseline, Box } from "@mui/material";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Normalize browser styles */}
        <CssBaseline />

        {/* Fixed Navbar */}
        <Navbar />

        {/* Main content area with top padding to avoid overlap */}
        <Box
          component="main"
          sx={{
            pt: { xs: 10, sm: 12 }, // spacing below fixed navbar
            px: { xs: 2, sm: 4 },
            minHeight: "100vh",
            backgroundColor: "#fafafa",
          }}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />


            {/* Protected routes (require login) */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />

            {/* Fallback for unknown routes */}
            <Route
              path="*"
              element={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                    flexDirection: "column",
                    color: "text.secondary",
                  }}
                >
                  <h2>404 - Page Not Found</h2>
                  <p>The page you’re looking for doesn’t exist.</p>
                </Box>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
