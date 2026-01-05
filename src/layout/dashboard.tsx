import React, { useEffect, useState } from 'react';
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
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

import { Outlet, useNavigate, useLocation } from 'react-router';
import { appConfig } from '../app-config';

import music from '../assets/imgs/music.jpg';
import everest from '../assets/imgs/Everest.jpg';
import pokhara from '../assets/imgs/Pokhare_street_festival.png';

import Footer from './footer';
import RegisterForm from '../pages/events/register-form';

const drawerWidth = 60;
const expandedDrawerWidth = 200;

export const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

            {/* Register button AFTER profile */}
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

          {location.pathname === '/home' && (
            <CarouselFeature onOpenRegister={() => setOpenRegisterDialog(true)} />
          )}

          <Outlet />

          <RegisterDialog open={openRegisterDialog} onClose={() => setOpenRegisterDialog(false)} />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

/* ================= Carousel ================= */

const CarouselFeature: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const navigate = useNavigate();

  const featuredEvents = [
    {
      id: '123',
      title: 'Everest Base Camp Trek',
      date: '3 Jan 2026',
      location: 'Pokhara, Nepal',
      desc: 'Join the most iconic trek this season.',
      image: everest,
    },
    {
      id: '124',
      title: 'Pokhara Street Festival',
      date: '29 Dec 2025',
      location: 'Pokhara, Nepal',
      desc: 'Experience culture and adventure.',
      image: pokhara,
    },
    {
      id: '125',
      title: 'Music Concert',
      date: '20 Mar 2026',
      location: 'Kathmandu, Nepal',
      desc: 'Nepathya live in Kathmandu.',
      image: music,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  });

  const item = featuredEvents[index];

  return (
    <Card sx={{ mb: 3, display: 'flex', height: 320 }}>
      <CardMedia component="img" image={item.image} sx={{ width: '45%' }} />
      <CardContent>
        <Typography variant="h5">{item.title}</Typography>
        <Typography sx={{ mt: 1 }}>
          {item.date} • {item.location}
        </Typography>
        <Typography sx={{ mt: 2 }}>{item.desc}</Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }} onClick={onOpenRegister}>
            Book Now
          </Button>
          <Button variant="outlined" onClick={() => navigate(`/events/${item.id}`)}>
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ================= Register Dialog ================= */

const RegisterDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
};
