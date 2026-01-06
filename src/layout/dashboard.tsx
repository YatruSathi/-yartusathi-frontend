import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

import { Outlet, useNavigate } from 'react-router';
import { appConfig } from '../app-config';

import Footer from './footer';

const drawerWidth = 60;
const expandedDrawerWidth = 200;

export const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '100%',
        width: hovered ? expandedDrawerWidth : drawerWidth,
        transition: 'width 0.2s',
        overflowX: 'hidden',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s' }}
        >
          {appConfig.appName}
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, path: '/home' },
          { text: 'Events', icon: <EventIcon />, path: '/events' },
          { text: 'My Events', icon: <EventIcon color="primary" />, path: '/my-events' },
          { text: 'Favorite', icon: <FavoriteIcon color="error" />, path: '/favorite' },
          { text: 'Chatbot', icon: <ChatIcon color="primary" />, path: '/chatbot' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        ].map(item => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: hovered ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: hovered ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* ================= AppBar ================= */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${hovered ? expandedDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${hovered ? expandedDrawerWidth : drawerWidth}px` },
          transition: 'width 0.2s, margin-left 0.2s',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {appConfig.appName}
            </Typography>
          </Box>

          {/* ===== Right Corner Actions ===== */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 6 }}>
            <IconButton color="inherit" onClick={() => navigate('/notification')}>
              <NotificationsIcon />
            </IconButton>

            <IconButton color="inherit" onClick={() => navigate('/user-profile')}>
              <PeopleIcon />
            </IconButton>

            {/* Register Button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                ml: 1,
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= Layout ================= */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Drawer
          variant="permanent"
          open
          sx={{
            '& .MuiDrawer-paper': {
              width: hovered ? expandedDrawerWidth : drawerWidth,
              transition: 'width 0.2s',
              overflowX: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
