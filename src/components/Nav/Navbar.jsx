/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import SearchBar from '../Search/Search.jsx';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { googleLogout } from '@react-oauth/google';
import { Button, Avatar, Menu, MenuItem, IconButton, Typography, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Custom switch with icon
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 36,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 3,
    padding: 0,
    transform: 'translateX(-1px)',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: '"🌙"',   // icon moon
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fdd835',
    width: 28,
    height: 28,
    '&:before': {
      content: '"🌞"',     // icon sun
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    opacity: 1,
  },
}));

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logOut = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Blog
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={NavLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Mobile Search/Login actions could be added here if needed */}
        {!user && (
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/login" sx={{ justifyContent: 'center' }}>
              <Button variant="contained" color="primary" fullWidth>Sign In</Button>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <svg
              width="36"
              height="50"
              viewBox="0 0 76 65"
              fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-auto sm:w-10"
            >
              <path
                d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                fill={isDarkMode ? '#fff' : '#000'} />
            </svg>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Blog</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `relative text-lg font-medium transition-colors duration-300 ${isActive
                  ? 'text-black dark:text-white after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 after:content-[""] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Section (Search, Theme, User) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          <ThemeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            inputProps={{ 'aria-label': 'toggle theme' }}
          />

          {user ? (
            <div>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                className="p-0"
              >
                <Avatar alt={user.name} src={user.picture} sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled><Typography variant="body2">{user.name}</Typography></MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/login"
              className="hidden sm:flex"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon className="text-gray-700 dark:text-gray-200" />
          </IconButton>
        </div>
      </header>

      {/* Mobile Sidebar/Drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
