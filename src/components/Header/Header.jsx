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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="40"
                    height="40"
                >
                    {/* Tam giác bất khả thi (Penrose triangle style) */}
                    <path
                        d="M256 20L492 436H372L256 236L140 436H20L256 20Z"
                        fill="black"
                    />
                    <path
                        d="M372 436L256 236L140 436H372Z"
                        fill="white"
                    />
                </svg>
                <span className={styles.logoText}>khaicube</span>
            </div>
            <nav className={styles.nav}>
                <div className={styles.highlight}></div>
                <li><Link to="/" className={styles.navLink}>Home</Link></li>
                <li><Link to="/blog" className={styles.navLink}>Blog</Link></li>
                <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>

            </nav>
            <SearchBar />

            <ThemeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
        </header >
    );
};

export default Header;
