import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Background = styled(Box)(() => ({
  minHeight: "100vh",
  background: "linear-gradient(to right, #1e3c72, #2a5298)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px", // Prevent content overflow on tiny screens
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 400,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[6],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: "none",
  background: "#1e88e5",
  "&:hover": {
    background: "#1565c0",
  },
}));

export const Login: React.FC = () => {
  //TODO: Read about react hook, useState, useEffect, other custom hook  
  const navigate = useNavigate()
  return (
    <Background>
      <LoginPaper elevation={3}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          Please login to your account
        </Typography>
        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
          />
          <StyledButton onClick={() => navigate('/home')} fullWidth variant="contained">
            Login
          </StyledButton>
        </Box>
      </LoginPaper>
    </Background>
  );
};
