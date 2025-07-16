import React from "react";
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
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from '@mui/icons-material/Event';
import { Outlet, useNavigate } from "react-router";
import { appConfig } from "../app-config";




const drawerWidth = 60; // Icon-only width
const expandedDrawerWidth = 200; // Width when hovered


export const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: "100%",
        transition: "width 0.2s",
        width: hovered ? expandedDrawerWidth : drawerWidth,
        overflowX: "hidden",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {appConfig.appName}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: "Home", icon: <HomeIcon />, path: "/home" },
          { text: "Events", icon: <EventIcon />, path: "/events" },
          { text: "Profile", icon: <PeopleIcon />, path: "/user-profile" },

        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: hovered ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: hovered ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${hovered ? expandedDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${hovered ? expandedDrawerWidth : drawerWidth}px` },
          transition: "width 0.2s, margin-left 0.2s",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {appConfig.appName}
          </Typography>
        </Toolbar>
      </AppBar>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: hovered ? expandedDrawerWidth : drawerWidth,
              transition: "width 0.2s",
              overflowX: "hidden",
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
          transition: "width 0.2s",
        }}
      >
        <Toolbar />
        {/* Renders whatever child route is active */}
        <Outlet />
      </Box>
    </Box>
  );
};
