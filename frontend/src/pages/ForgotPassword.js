import React, { useState } from "react";
import API from "../api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await API.post("/api/users/forgot-password", { email });
      setMessage(res.data?.message || "Password reset link sent to your email!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
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
            Forgot Password 🔒
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Enter your email to receive a reset link
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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                background: "linear-gradient(135deg, #FF7043, #FF5722)",
                mb: 3,
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {message && (
            <Typography
              variant="body2"
              color="success.main"
              sx={{ mt: 1, fontWeight: 500 }}
            >
              {message}
            </Typography>
          )}

          <Typography variant="body2" sx={{ mt: 3 }}>
            Back to{" "}
            <Typography
              component={Link}
              to="/login"
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Login
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ForgotPassword;
