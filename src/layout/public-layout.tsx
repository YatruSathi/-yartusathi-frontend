import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#fff', boxShadow: 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: '#1a365d',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Nepal Events
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/events" sx={{ color: '#2c5282' }}>
              Events
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              sx={{
                color: '#2c5282',
                borderColor: '#2c5282',
                '&:hover': {
                  borderColor: '#1a365d',
                  bgcolor: 'rgba(44, 82, 130, 0.05)',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
