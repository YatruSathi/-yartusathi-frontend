import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar } from './sidebar';
import type { ReactNode } from 'react';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

interface LayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 1200,
            bgcolor: '#fff',
            boxShadow: 1,
            '&:hover': {
              bgcolor: '#f8fafc',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3 },
          ml: { xs: 0, md: '240px' },
          backgroundColor: '#f8fafc',
          pt: isMobile ? 7 : 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
