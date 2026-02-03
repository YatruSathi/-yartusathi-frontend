import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router';

const DRAWER_WIDTH = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  requiresAuth: boolean;
}

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const menuItems: MenuItem[] = [
  { text: 'Home', icon: <HomeIcon />, path: '/home', requiresAuth: false },
  { text: 'Events', icon: <EventIcon />, path: '/events', requiresAuth: false },
  { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorite', requiresAuth: true },
  {
    text: 'Notifications',
    icon: <NotificationsIcon />,
    path: '/notification',
    requiresAuth: true,
  },
  {
    text: 'Chatbot',
    icon: <SmartToyIcon />,
    path: '/chatbot',
    requiresAuth: false,
  },
  {
    text: 'Profile',
    icon: <PersonIcon />,
    path: '/user-profile',
    requiresAuth: true,
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
    requiresAuth: false,
  },
];

export function Sidebar({ mobileOpen, onDrawerToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLoggedIn = !!localStorage.getItem('token');

  const handleNavigation = (item: MenuItem) => {
    if (item.requiresAuth && !isLoggedIn) {
      navigate('/login');
    } else {
      navigate(item.path);
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 700 }}>
          Nepal Tourism
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleNavigation(item);
                if (isMobile) {
                  onDrawerToggle();
                }
              }}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e2e8f0',
                  '&:hover': {
                    backgroundColor: '#cbd5e0',
                  },
                },
                '&:hover': {
                  backgroundColor: '#cbd5e0',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#2c5282' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    color: '#2d3748',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
              {item.requiresAuth && !isLoggedIn && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#d32f2f',
                    ml: 1,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="navigation drawer"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
