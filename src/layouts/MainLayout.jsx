import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Nav/Navbar.jsx';
import styles from '../App.module.css';

const MainLayout = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className={styles.App}>
            <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

            <ToastContainer position="bottom-right" autoClose={3000} />

            <div className={styles.content}>
                <Outlet />
            </div>

            <footer className={styles.footer}>
                <div className={styles.footercontent}>
                    <p>
                        Hi! I'm <strong>Vũ Xuân Hùng</strong>, a Computer Science student at
                        Hanoi University of Industry.
                    </p>

                    <div className={styles.social}>
                        <a href="https://www.facebook.com/vu.xuan.hung.883474" target="_blank" rel="noreferrer">
                            <i className="fab fa-facebook"></i> Facebook
                        </a>
                        <a href="https://github.com/vu-xuan-hung" target="_blank" rel="noreferrer">
                            <i className="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>© 2025 Vũ Xuân Hùng. All rights reserved. | Designed & Developed by Hùng Vũ</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
