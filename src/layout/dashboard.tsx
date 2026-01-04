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
  Stack,
  Chip,
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

const drawerWidth = 60; // Icon-only width
const expandedDrawerWidth = 200; // Width when hovered

export const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
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
        transition: 'width 0.2s',
        width: hovered ? expandedDrawerWidth : drawerWidth,
        overflowX: 'hidden',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
          }}
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
                sx={{
                  opacity: hovered ? 1 : 0,
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
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
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {appConfig.appName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, pr: 6 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate('/notification')}
              aria-label="notifications"
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate('/user-profile')}
              aria-label="profile"
            >
              <PeopleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          component="nav"
          sx={{ width: { sm: hovered ? expandedDrawerWidth : drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: hovered ? expandedDrawerWidth : drawerWidth,
                transition: 'width 0.2s',
                overflowX: 'hidden',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${hovered ? expandedDrawerWidth : drawerWidth}px)` },
            transition: 'width 0.2s',
          }}
        >
          <Toolbar />
          {/* Featured events carousel only shows on home page */}
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

const CarouselFeature: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const navigate = useNavigate();
  const featuredEvents = [
    {
      id: '123',
      title: 'Everest Base Camp Trek',
      date: '3 Jan 2026',
      location: 'Pokhara, Nepal',
      desc: 'Join the most iconic trek this season. Limited spots available.',
      image: everest,
    },
    {
      id: '124',
      title: 'Pokhara Street Festival',
      date: '29 Dec 2025',
      location: 'Pokhara, Nepal',
      desc: 'Experience culture and adventure at Pokhara Festival.',
      image: pokhara,
    },
    {
      id: '125',
      title: 'Music Concert',
      date: '20 Mar 2026',
      location: 'Kathmandu, Nepal',
      desc: 'Experience the soul of Nepal live with Nepathya in Kathmandu.',
      image: music,
    },
  ];

  const maxItems = Math.min(featuredEvents.length, 3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % maxItems), 5000);
    return () => clearInterval(timer);
  }, [maxItems]);

  const goToSlide = (slideIndex: number) => setIndex(slideIndex);

  const item = featuredEvents[index];

  return (
    <Box sx={{ mb: 3, position: 'relative', width: '100%' }}>
      <Card
        sx={{
          display: 'flex',
          borderRadius: 3,
          overflow: 'hidden',
          height: { xs: 220, sm: 320 },
          boxShadow: 6,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            boxShadow: 10,
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{ width: { xs: '40%', sm: '45%' }, height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography component="div" variant="h5" sx={{ fontWeight: 800 }}>
                {item.title}
              </Typography>
              <Chip label="Featured" color="primary" />
            </Stack>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 1 }}>
              Starts: {item.date} • {item.location}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {item.desc}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={onOpenRegister}>
                Book Now
              </Button>
              <Button variant="outlined" onClick={() => navigate(`/events/${item.id}`)}>
                Details
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>

      {/* Dot indicators at bottom center */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        {featuredEvents.slice(0, maxItems).map((_, dotIndex) => (
          <Box
            key={dotIndex}
            onClick={() => goToSlide(dotIndex)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: index === dotIndex ? 'primary.main' : '#ccc',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: index === dotIndex ? 'primary.main' : '#999',
                transform: 'scale(1.1)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const RegisterDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
};
