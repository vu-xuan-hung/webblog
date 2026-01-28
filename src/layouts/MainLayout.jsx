import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Nav/Navbar.jsx';

const MainLayout = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

            <ToastContainer position="bottom-right" autoClose={3000} />

            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 box-border">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 py-8 text-center font-sans mt-auto border-t border-slate-700">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-lg mb-6 leading-relaxed">
                        Hi! I'm <strong className="text-blue-400">Vũ Xuân Hùng</strong>, a Computer Science student at
                        Hanoi University of Industry.
                    </p>

                    <div className="flex justify-center gap-6 mb-6">
                        <a
                            href="https://www.facebook.com/vu.xuan.hung.883474"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 flex items-center gap-2 font-medium no-underline"
                        >
                            <i className="fab fa-facebook text-xl"></i> Facebook
                        </a>
                        <a
                            href="https://github.com/vu-xuan-hung"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-300 flex items-center gap-2 font-medium no-underline"
                        >
                            <i className="fab fa-github text-xl"></i> GitHub
                        </a>
                    </div>

                    <div className="border-t border-slate-700 pt-4 mt-6 text-sm text-slate-500">
                        <p>© 2025 Vũ Xuân Hùng. All rights reserved. | Designed & Developed by Hùng Vũ</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
