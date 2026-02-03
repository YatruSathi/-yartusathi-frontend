import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, TextField, Typography, Divider, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import lumbini from '../../assets/imgs/Lumbini .jpg';
import manang from '../../assets/imgs/Manang.jpg';
import api from '../../api/api';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await api.post('auth/login/', {
        email,
        password,
      });

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
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
          px: { xs: 2, sm: 4 },
          py: { xs: 4, md: 0 },
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />

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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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
          minHeight: { xs: '300px', md: 'auto' },
        }}
      >
        <Box
          component="img"
          src={lumbini}
          alt="Lumbini"
          sx={{
            width: { xs: '100%', md: '55%' },
            height: { xs: 'auto', md: '70%' },
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />

        <Box
          component="img"
          src={manang}
          alt="Manang"
          sx={{
            width: { xs: '100%', md: '30%' },
            height: { xs: 'auto', md: '55%' },
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />
      </Box>
    </Box>
  );
};
