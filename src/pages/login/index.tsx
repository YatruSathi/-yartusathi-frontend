import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import lumbini from '../../assets/imgs/Lumbini .jpg';
import manang from '../../assets/imgs/Manang.jpg';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#f8fafc',
      }}
    >
      {/* LEFT – LOGIN SECTION */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          <Typography variant="h6" fontWeight={700}>
            YATRUSATHI.CO
          </Typography>

          <Typography variant="h4" fontWeight={600} mt={4}>
            Login
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Access your account
          </Typography>

          <TextField fullWidth label="Email Address" margin="normal" />

          <TextField fullWidth label="Password" type="password" margin="normal" />

          <Box textAlign="right" mt={1}>
            <Button size="small" onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </Button>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.3,
              bgcolor: '#083344',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#0f4c5c',
              },
            }}
            onClick={() => navigate('/home')}
          >
            Login
          </Button>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Continue with Google
          </Button>

          <Typography align="center" mt={3}>
            Don’t have an account?{' '}
            <Button size="small" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Typography>

          <Box mt={6}>
            <Typography fontWeight={600}>Travel Smarter, Travel Safer</Typography>
            <Typography variant="body2" color="text.secondary">
              www.yatrusathi.co
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* RIGHT – IMAGE SECTION */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          px: 4,
        }}
      >
        <Box
          component="img"
          src={lumbini}
          alt="Lumbini"
          sx={{
            width: '55%',
            height: '70%',
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />

        <Box
          component="img"
          src={manang}
          alt="Manang"
          sx={{
            width: '30%',
            height: '55%',
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />
      </Box>
    </Box>
  );
};
