import React from 'react';
import styles from './Header.module.css';
import { Link } from "react-router-dom";
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
        <header className={styles.header}>
            <div className={styles.logo}>
                <span className={styles.logoText}>3tocom</span>
            </div>
            <nav className={styles.nav}>
                <Link to="/" className={styles.navLink}>Home</Link>
                <Link to="/blog" className={styles.navLink}>Blog</Link>
                <Link to="/contact" className={styles.navLink}>Contact</Link>
                <Link to="/aplicate" className={styles.navLink}>Aplicate</Link>
            </nav>
            <SearchBar />

            <ThemeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
        </header>
    );
};

export default Header;
