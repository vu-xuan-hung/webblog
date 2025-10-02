/* eslint-disable no-unused-vars */
import "./App1.css";
import CreateBlog from "./pages/admin/createBlog.jsx";
import PrivateRoute from "./pages/admin/PrivateRoute.jsx";
import Loginad from "./pages/admin/adminLogin.jsx";
import { Routes, Route, Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreateIcon from "@mui/icons-material/Create";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminProfile from "./pages/admin/profile.jsx";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import useLocalStorage from "use-local-storage";
import React, { useState, useEffect } from "react";

const styles = {
    dashboard: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f0f2f5',
        alignItems: 'center',
    },
    details: {
        lineHeight: '1.5',
    },
    name: {
        margin: '0',
        fontSize: '1.5em',
    },
    text: {
        margin: '0',
    },
    totalBlogs: {
        fontWeight: 'bold',
    },
    actions: {
        display: 'flex',
    },


    separator: {
        border: '0',
        borderTop: '1px solid #ccc',
        margin: '20px 0',
    },

    blogTableContainer: {

        marginTop: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',

    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#34495e',
        color: 'white',
        alignItems: 'left'
    },
    th: {
        padding: '15px',
        textAlign: 'left',

    },
    td: {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        margin: 'auto',
        textAlign: 'left',
        overflow: 'hidden'
    },
    blogThumbnail: {
        width: '50px',
        height: '30px',
        objectFit: 'cover',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    deleteBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
{/* <Route> (có path và element). */ }
{/* <Link> chỉ để chuyển trang, nó chỉ cần to="/...". */ }
function App1() {
    const navigate = useNavigate();
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", preference);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const [blogs, setBlogs] = useState([]);
    const [isCount, setIsCount] = useState(0);
    const [isCountV, setIsCountV] = useState(0);

    const mainBlogPosts = blogs.filter(post => post.tag !== "Featured");
    const apiUrl = import.meta.env.VITE_FILE_ALL;
    useEffect(() => {
        async function count() {
            const res = await fetch(apiUrl);
            const data = await res.json();
            let views = 0;
            for (let i of data) {
                views += i.view;
            }
            setIsCountV(views);
            setIsCount(data.length);
            setBlogs(data);
        }
        count();
    }, [apiUrl]);
    const handleDelete = async (idToDelete) => {
        try {
            const res = await fetch(`${apiUrl.split('/api'[0])}/delete/${idToDelete}}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setBlogs(prevBlogs => prevBlogs.filter(post => post.id !== idToDelete));
            } else {
                alert("Xóa thất bại!");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server");
        }
    };



    useEffect(() => {
        document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("expiry");
        navigate("/admin/adminLogin");
    };

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
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fdd835',
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
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#aab4be',
            opacity: 1,
        },
    }));
    //  Component hiển thị Dashboard
    const Dashboard = () => (
        <>

            <div className="container">

                <div className="k"
                >
                    <div className="card"
                        style={{
                            backgroundColor: isDarkMode ? '#b4991f' : '#fff', // màu nền khi dark/light
                            color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                            padding: '20px',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}>
                        <PeopleIcon />
                        <p>Total Views</p>
                        <h3>{isCountV}</h3>
                    </div>
                </div>
                <div className="k">
                    <div className="card" style={{
                        backgroundColor: isDarkMode ? '#a0d2eb' : '#fff', // màu nền khi dark/light
                        color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}>
                        <ArticleIcon />
                        <p>Total post</p>
                        <h3>{isCount}</h3>
                    </div>

                </div>
                <div className="k">
                    <div className="card" style={{
                        backgroundColor: isDarkMode ? '#00DDFF' : '#fff', // màu nền khi dark/light
                        color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}>
                        <ArticleIcon />
                        <p>Total money</p>
                        <h3>23565.15$</h3>
                    </div>

                </div>
                <div className="k">
                    <div className="card" style={{
                        backgroundColor: isDarkMode ? ' #c2edda' : '#fff', // màu nền khi dark/light
                        color: isDarkMode ? '#fff' : '#333',             // màu chữ khi dark/light
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}>
                        <ArticleIcon />
                        <p>Total Member</p>
                        <h3>2</h3>
                    </div>

                </div>
            </div>
            {/* Phần bảng danh sách blog */}
            <div style={{ ...styles.blogTableContainer, fontWeight: 'bold', }}>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.th}>S.No</th>
                            <th style={styles.th}>Thumbnail</th>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            backgroundColor: isDarkMode ? '#c2edda' : '#fff', // màu nền khi dark/light
                            color: isDarkMode ? '#333' : '#333',             // màu chữ khi dark/light
                        }}
                    >
                        {mainBlogPosts.map((post, index) => (

                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>
                                    <img src={post.thumbnail} alt="Thumbnail" style={styles.blogThumbnail} />
                                </td>
                                <td style={styles.td}>{post.title}</td>

                                <td style={styles.td}>{post.releaseDate}</td>
                                <td style={styles.td}>
                                    <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );

    return (

        <div>
            {/* Sidebar */}
            <div className="sidebar"
                style={{
                    backgroundColor: isDarkMode ? '#1093d5' : '#1877f2'
                }}>
                <ul>
                    <li>
                        <Link to="/admin/createBlog">
                            <CreateIcon />
                            <span>Create Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={
                                localStorage.getItem("adminToken")//nếu còn đn thì chọn cái 1
                                    ? "/admin/profile"
                                    : "/admin/adminLogin"
                            }
                        >
                            <AdminPanelSettingsIcon />
                            <span>Admin</span>
                        </Link>
                    </li>
                    <li>

                        <Link to="/admin">
                            <DashboardIcon />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <div className="toggle-switch">
                        <div className="toggle-slider"></div>
                    </div>

                    <div style={{
                        display: "grid",
                        marginTop: "auto",
                    }}>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    padding: "10px",
                                }}
                            >
                                <PowerSettingsNewIcon />
                                <span style={{ marginLeft: "28px" }}>Logout</span>
                            </button>


                        </li>
                        <ThemeSwitch
                            style={{}}
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />


                    </div>


                </ul>
            </div >

            {/* Content */}
            < div className="content" >
                <Routes>
                    <Route
                        path="createBlog"
                        element={
                            <PrivateRoute>
                                <CreateBlog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="profile"
                        element={
                            <PrivateRoute>
                                <AdminProfile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                                {/* truyen props */}
                            </PrivateRoute>
                        }
                    />

                    <Route path="adminLogin" element={<Loginad isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="admin" element={<Dashboard />} />
                </Routes>
            </div >
        </div>
    );
}

export default App1;
