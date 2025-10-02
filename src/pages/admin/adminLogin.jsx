import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // thêm cái này
import styles from "./adminLogin.module.css"
const Loginad = ({ isDarkMode, setIsDarkMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');

        if (email === 'admin@gmail.com' && password === '1') {
            // tạo token giả định
            const token = "logged-in";

            // thời gian hết hạn (ví dụ 30 phút)
            const expiry = Date.now() + 10 * 60 * 1000;

            // lưu vào localStorage
            localStorage.setItem("adminToken", token);
            localStorage.setItem("expiry", expiry);

            setMessage('Đăng nhập thành công!');
            setMessageType('success');

            // Chuyển hướng sau 1 giây
            setTimeout(() => {
                navigate('/admin/profile');
            }, 1000);

        } else {
            setMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
            setMessageType('error');
        }
    };


    return (
        <div className={styles.logincontainer}
        >
            <div className={styles.logincard}
                style={{
                    backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
                    color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                }} >
                <div className={styles.loginheader}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.loginicon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c2.49 0 4.5 2.01 4.5 4.5S14.49 14 12 14s-4.5-2.01-4.5-4.5S9.51 5 12 5zm0 14.4c-2.7 0-5.83-1.63-7.5-3.66 1.67-2.03 4.8-3.66 7.5-3.66s5.83 1.63 7.5 3.66c-1.67 2.03-4.8 3.66-7.5 3.66z" />
                    </svg>
                    <h1 className={styles.logintitle}>Admin Login</h1>
                </div>
                <form onSubmit={handleLogin} className={styles.loginform}>
                    <div style={{

                        color: isDarkMode ? '#333' : '#333',             // màu chữ khi dark/light
                    }}>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={styles.logininput}

                        />
                    </div>
                    <div style={{

                        color: isDarkMode ? '#333' : '#333',             // màu chữ khi dark/light
                    }}>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            className={styles.logininput}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.loginbutton}
                    >
                        Đăng nhập
                    </button>
                </form>
                {message && (
                    <div className={`${styles.messagebox} ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Loginad;
