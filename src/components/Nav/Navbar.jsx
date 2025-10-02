/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import SearchBar from '../Search/Search.jsx';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


// Custom switch với icon
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
        content: '"🌙"',   // icon mặt trăng
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fdd835',
    width: 28,//nút chuyển đổi
    height: 28,
    '&:before': {
      content: '"🌞"',     // icon mặt trời
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
    borderRadius: 20 / 2,//làm nó tròn
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    opacity: 1,
  },
}));

const Header = ({ isDarkMode, toggleDarkMode }) => {

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg

            width="46"
            height="65"
            viewBox="0 0 76 65"

            fill="none" xmlns="http://www.w3.org/2000/svg"><path
              d="M37.5274 0L75.0548 65H0L37.5274 0Z"
              fill={isDarkMode ? '#fff' : '#000'} /></svg>
          <span className={styles.logoText}>Blog</span>
        </div>
        <nav className={styles.nav}>
          <div className={styles.highlight}></div>
          <li><NavLink to="/" className={styles.navLink}>Home</NavLink></li>
          <li><NavLink to="/blog" className={styles.navLink}>Blog</NavLink></li>
          <li><NavLink to="/contact" className={styles.navLink}>Contact</NavLink></li>

        </nav>

        <SearchBar />

        <ThemeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />

      </header >

    </>
  );
};

export default Header;
