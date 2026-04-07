import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Nav/Navbar.jsx';
import styles from '../App.module.css';
import ProfileHeader from '../components/Profile/ProfileHeader.jsx';
import { Container, Box, Typography } from '@mui/material';

const MainLayout = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className={styles.App}>
            <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

            <ToastContainer position="bottom-right" autoClose={3000} />

            <Container maxWidth="md" sx={{ px: 2, py: 3, flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                <ProfileHeader />
                <Box sx={{ width: '100%' }}>
                    <Outlet />
                </Box>
            </Container>

            <Box component="footer" sx={{
                py: 3,
                textAlign: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 'auto',
                bgcolor: 'background.paper'
            }}>
                <Typography variant="body2" color="text.secondary">
                    © 2025 Vũ Xuân Hùng. All rights reserved. | Designed & Developed by Hùng Vũ
                </Typography>
            </Box>
        </div>
    );
};

export default MainLayout;
