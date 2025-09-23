import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // thêm cái này

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
        <div className="flex items-center justify-center min-h-screen p-4"
            style={{

            }}>
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg"
                style={{
                    backgroundColor: isDarkMode ? ' #c2edda' : '#fff',// màu nền khi dark/light
                    color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                }} >
                <div className="flex flex-col items-center space-y-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-6xl text-gray-400 h-16 w-16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c2.49 0 4.5 2.01 4.5 4.5S14.49 14 12 14s-4.5-2.01-4.5-4.5S9.51 5 12 5zm0 14.4c-2.7 0-5.83-1.63-7.5-3.66 1.67-2.03 4.8-3.66 7.5-3.66s5.83 1.63 7.5 3.66c-1.67 2.03-4.8 3.66-7.5 3.66z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
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
                            className="relative block w-full px-4 py-2 border rounded-md"

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
                            className="relative block w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Đăng nhập
                    </button>
                </form>
                {message && (
                    <div className={`p-3 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Loginad;
