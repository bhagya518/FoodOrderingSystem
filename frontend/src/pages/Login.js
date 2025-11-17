// src/pages/Login.js
import React, { useState } from "react";
import API, { setAuthToken } from "../api";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/users/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);
      setAuthToken(token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ABE2 0%, #5563DE 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            width: "100%",
            maxWidth: 400,
            backdropFilter: "blur(12px)",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={3}>
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Login to continue ordering delicious food
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              required
            />

            {/* Forgot Password link */}
            <Box sx={{ textAlign: "right", mb: 3 }}>
              <Typography
                component={Link}
                to="/forgot-password"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                background: "linear-gradient(135deg, #FF7043, #FF5722)",
                mb: 3,
              }}
            >
              Login
            </Button>
          </form>

          {/* Signup link */}
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
