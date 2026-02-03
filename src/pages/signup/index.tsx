import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, TextField, Typography, Divider, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import lumbini from '../../assets/imgs/Lumbini .jpg';
import manang from '../../assets/imgs/Manang.jpg';
import api from '../../api/api';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSignup = async () => {
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('Username, email, and password are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('auth/signup/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      // Auto-login after successful signup
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Signup failed. Please try again.'
      );
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
      {/* LEFT – SIGNUP SECTION */}
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
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            YATRUSATHI.CO
          </Typography>

          <Typography variant="h4" fontWeight={600} mt={4} sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
            Create Account
          </Typography>

          <Typography color="text.secondary" mb={3} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Join our travel community
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                },
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={formData.username}
            onChange={handleChange('username')}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange('password')}
            required
            helperText="At least 8 characters"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSignup();
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: { xs: 1.1, sm: 1.3 },
              bgcolor: '#083344',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                bgcolor: '#0f4c5c',
              },
            }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <Divider sx={{ my: { xs: 2, sm: 3 } }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
            sx={{
              py: { xs: 1, sm: 1.2 },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              borderColor: '#083344',
              color: '#083344',
              '&:hover': {
                borderColor: '#0f4c5c',
                bgcolor: 'rgba(8, 51, 68, 0.04)',
              },
            }}
          >
            Continue with Google
          </Button>

          <Typography align="center" mt={{ xs: 2, sm: 3 }} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Already have an account?{' '}
            <Button 
              size="small" 
              onClick={() => navigate('/login')}
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textTransform: 'none',
              }}
            >
              Login
            </Button>
          </Typography>

          <Box mt={{ xs: 4, sm: 6 }}>
            <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Travel Smarter, Travel Safer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
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
