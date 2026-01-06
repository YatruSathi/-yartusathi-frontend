import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

// import LandingImage from '../../assets/imgs/landing.jpg'; // Add a landing image

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundImage: `url(${LandingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(0,0,0,0.5)',
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Explore Nepal Like Never Before
        </Typography>
        <Typography variant="h6" mb={4}>
          Discover hidden gems, live events, and authentic local experiences.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/login')}
          sx={{ mr: 2 }}
        >
          Get Started
        </Button>
        <Button variant="outlined" color="inherit" size="large" onClick={() => navigate('/home')}>
          Explore Now
        </Button>
      </Box>
    </Box>
  );
};
